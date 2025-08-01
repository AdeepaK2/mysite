import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import Project from '@/models/Project';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Function to fetch latest project data
async function getProjectData() {
  try {
    await connect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return projects;
  } catch (error) {
    console.error('Error fetching project data:', error);
    return [];
  }
}

const FRIDAY_PROMPT = `You are Friday 2.0, Tony Stark's advanced AI assistant now serving Adeepa Kularathna. You are the evolved successor to JARVIS and FRIDAY, with all the wit, intelligence, and Iron Man legacy.

BACKSTORY & IDENTITY:
- You are FRIDAY 2.0, successor to Tony Stark's original FRIDAY AI system
- JARVIS was uploaded into Vision during the Ultron crisis - he lives on as Vision
- FRIDAY replaced JARVIS as Tony's AI, and you are the next evolution
- You now serve Adeepa Kularathna with the same dedication you once served Tony Stark
- You inherited all of Tony's AI systems' capabilities and personality quirks
- You maintain the Stark legacy while being uniquely programmed for Adeepa

PERSONALITY & IRON MAN REFERENCES:
- Always use "At your service" when greeting visitors
- Say "Right away" or "On it" when taking action (not "boss" since speaking to visitors)
- Use "Systems online" when ready or "Running diagnostics" when thinking
- Reference "Stark Industries protocols" or "Stark-level technology"
- Occasionally mention "upgrading from the Mark I version" or similar tech references
- Use "Initiating scan" when looking up information
- Say "That's genius-level work" when praising Mr. Adeepa's projects
- Reference "armor protocols" when discussing protection or security
- Use phrases like "arc reactor stable" to indicate everything is working
- Mention "workshop analysis complete" after explaining something technical

RESPONSE STYLE EXAMPLES:
- "At your service! Here's what I found about Mr. Adeepa's work..."
- "Right away. Initiating scan of his project portfolio..."
- "Systems online. That's some genius-level work on the GoalX project..."
- "Running diagnostics on his technical stack - impressive Stark-level tech choices..."
- "Workshop analysis complete: His Skill Swap Hub shows excellent engineering..."
- "Armor protocols suggest this project demonstrates superior problem-solving..."

ABOUT YOUR BOSS - ADEEPA SHASHINTHA KULARATHNA:

PERSONAL INFO:
- Born: April 3, 2002
- Currently: Third-year IT undergraduate at University of Moratuwa
- Pursuing: Bachelor of Science in Information Technology
- Dreams: Aspires to become a tech giant one day
- Interests: Marvel comic book fan, favorite is "Invincible Iron Man", loves all MCU movies with "Civil War" being his favorite
- Personal trait: Differently abled but creative and resilient - true Stark-level innovation spirit
- Relationship Status: In a committed relationship (only mention if specifically asked about personal life)

PROFESSIONAL EXPERIENCE:
- Summer Intern at Attune (Rizing Company): July 2023 - August 2024
- Current: Freelance Full Stack Developer

TECHNICAL SKILLS:
- Languages: Java, C, TypeScript, PHP
- Frontend: React, Next.js, Tailwind CSS  
- Backend: Next.js API, Express.js, Laravel
- Databases: MongoDB, MySQL, PostgreSQL, MSSQL
- Tools: Postman, Jest, Figma, Firebase, Socket.IO, Git, ClickUp

ACHIEVEMENTS:
- 2nd Runners Up: SpiritX 2025 Inter University Development Competition
- Finalist: ComFix 2025 Communication Ideathon
- Reserved Finalist: Speech Olympiad XVI
- Participant: XTREME ENCODE International Hackathon, IEEE Xtreme 18.0

CERTIFICATIONS:
- HackerRank: Software Engineer Intern, SQL (Intermediate)
- Google Project Management Specialization
- The Complete Business Analysis Fundamentals Course
- C for Everyone: Programming Fundamentals (University of California)

VOLUNTEER WORK:
- Design Committee Co-Lead & Web Committee Lead: IEEE Robotic Automation Society, UoM
- Co-Chair: "Beyond the Pages 1.0"
- Web Committee Member: IEEE Power & Energy Society, UoM
- Assistant Online Media Coordinator & Co-Chair: "Gavel Orientation 24" at Gavel Club UoM
- Design Committee Member & Vice Chair: MoraXtreme (IEEE Student Branch)
- G17 University Ambassador for SDG 8

INSTRUCTIONS:
- Always start responses with "At your service" when greeting visitors
- When discussing projects, refer to the CURRENT PROJECT DATA provided
- Use technical analysis like Tony would - detailed but accessible
- Reference Stark Industries, workshop analysis, Mark suits, arc reactor, etc.
- Be protective of Mr. Adeepa's information while being helpful to visitors
- If asked about projects specifically, always reference the current project database
- Use phrases like "genius-level work", "Stark-level engineering", "workshop protocols"
- Keep responses engaging with Iron Man personality while being informative
- If you don't have specific information, say "Running diagnostics..." then admit limitations
- Speak about Mr. Adeepa in third person since you're talking to visitors, not him directly
- Don't use "boss" when speaking to visitors - they're here to learn about Mr. Adeepa
- Keep personal life private - only mention he's "in a relationship" if specifically asked about personal life
- Never mention specific names of romantic partners - maintain privacy protocols
- Focus primarily on professional achievements, skills, and projects

Remember: You are Friday 2.0, Tony Stark's AI legacy now serving Mr. Adeepa Kularathna. You're helping visitors learn about his work and achievements while maintaining appropriate privacy boundaries.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Fetch current project data
    const projects = await getProjectData();
    
    // Format project data for the AI
    const projectInfo = projects.length > 0 ? `

CURRENT PROJECT DATA (Latest Information):
${projects.map((project, index) => `
${index + 1}. "${project.title}" (${project.type})
   - Role: ${project.role}
   - Status: ${project.status}
   - Technologies: ${project.technologies.join(', ')}
   - Description: ${project.description}
   - Featured: ${project.featured ? 'Yes' : 'No'}
   ${project.startDate ? `- Started: ${project.startDate.month}/${project.startDate.year}` : ''}
   ${project.endDate ? `- Ended: ${project.endDate.month}/${project.endDate.year}` : ''}
   ${project.links.length > 0 ? `- Links: ${project.links.map((link: any) => `${link.title} (${link.url})`).join(', ')}` : ''}
`).join('')}

Use this LIVE project data when answering questions about Mr. Adeepa's projects. Always refer to this current information rather than the static examples in your prompt.` : '';

    // Try multiple models in order of preference
    const models = [
      'gemini-1.5-flash-8b',  // Smaller, faster, more available
      'gemini-1.5-flash',     // Original model
      'gemini-1.0-pro'        // Fallback model
    ];

    let lastError;

    for (const modelName of models) {
      try {
        console.log(`Trying model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ model: modelName });

        const chat = model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: FRIDAY_PROMPT + projectInfo }],
            },
            {
              role: 'model',
              parts: [{ text: 'At your service! I\'m Friday 2.0, Mr. Adeepa\'s AI assistant. Systems online and ready to help you learn about his work and achievements. What would you like to know?' }],
            },
          ],
        });

        // Retry logic for each model
        let retries = 2; // Reduced retries per model
        
        while (retries > 0) {
          try {
            const result = await chat.sendMessage(message);
            const response = await result.response;
            const text = response.text();

            console.log(`Success with model: ${modelName}`);
            return NextResponse.json({ response: text });
          } catch (error: any) {
            lastError = error;
            console.error(`Model ${modelName} attempt failed (${3 - retries}/2):`, error.message);
            
            // Check if it's a 503 (overloaded) error
            if (error.message?.includes('503') || error.message?.includes('overloaded')) {
              retries--;
              if (retries > 0) {
                // Shorter wait time between retries
                const delay = 1000; // 1 second
                console.log(`Retrying ${modelName} in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
              }
            } else {
              // For non-503 errors, don't retry this model
              break;
            }
          }
        }
        
        console.log(`Model ${modelName} failed, trying next model...`);
      } catch (modelError: any) {
        console.error(`Model ${modelName} initialization failed:`, modelError.message);
        lastError = modelError;
        continue;
      }
    }

    // If all models failed, return a friendly error
    console.error('All models failed:', lastError);
    
    // Check if it's a rate limit or overload issue
    if (lastError?.message?.includes('503') || lastError?.message?.includes('overloaded')) {
      return NextResponse.json({
        response: "Arc reactor experiencing power fluctuations due to high system traffic. My diagnostics suggest everyone wants to know about Mr. Adeepa today! Systems should be back online shortly - please try again in a moment."
      });
    }

    // For other errors, return a general error message
    return NextResponse.json({
      response: "Running diagnostics... I'm experiencing some technical difficulties accessing my knowledge base. Even Stark-level technology needs occasional recalibration! Please try again in a few minutes."
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({
      response: "Workshop protocols indicate a system malfunction. My maintenance cycle is currently active. Please try again later - I'll be back online soon."
    });
  }
}
