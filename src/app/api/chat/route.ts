import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import Project from '@/models/Project';
import { validateApiKey, apiResponses } from '@/lib/auth';

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

// Demo response function for when API key is not configured
function getDemoResponse(message: string): string {
  if ((message.includes('project') && (message.includes('major') || message.includes('main') || message.includes('featured') || message.includes('key'))) || message.includes('featured')) {
    return `At your service! Here are Mr. Adeepa's featured projects:

Major Project Showcase:

• GoalX: Web application to connect Schools and Donors for Equipment Donation and Sharing, plus inter-school sports equipment sharing
• Skill Swap Hub: Platform connecting learners for mutual skill sharing without money exchange - fostering community learning

Technical Excellence:
• Full-stack development using React, Next.js, and TypeScript
• Real-time features with WebSocket integration
• Secure authentication and data management
• Responsive design for all devices

Workshop Analysis: These projects demonstrate Stark-level engineering with cutting-edge technology implementation.`;
  }
  
  if (message.includes('project') || message.includes('work')) {
    return `At your service! Here's an overview of Mr. Adeepa's project portfolio:

Current Projects:
• GoalX: Web application to connect Schools and Donors for Equipment Donation and Sharing, plus inter-school sports equipment sharing
• Skill Swap Hub: Platform connecting learners for mutual skill sharing without money exchange

Technical Highlights:
• Full-stack development using modern technologies
• Responsive design with seamless user experience
• Real-time features and secure authentication

Workshop Analysis: All projects demonstrate Stark-level engineering with cutting-edge tech stacks.`;
  }
  
  if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
    return `Systems online! Here's Mr. Adeepa's technical arsenal:

Programming Languages:
• Java - Enterprise-level development
• TypeScript - Type-safe web development
• PHP - Server-side scripting
• C - System programming

Frontend Technologies:
• React - Component-based UI development
• Next.js - Full-stack React framework
• Tailwind CSS - Utility-first styling

Backend & Databases:
• Express.js - Node.js web framework
• MongoDB - NoSQL database
• MySQL & PostgreSQL - Relational databases

Arc Reactor Status: All systems operational and battle-tested!`;
  }
  
  if (message.includes('experience') || message.includes('work') || message.includes('job')) {
    return `Running diagnostic on professional experience:

Current Position:
• Freelance Full Stack Developer - Building innovative solutions

Previous Experience:
• Summer Intern at Attune (Rizing Company)
• Duration: July 2023 - August 2024

Education:
• Third-year IT undergraduate at University of Moratuwa
• Pursuing Bachelor of Science in Information Technology

Stark Industries Protocol: Continuous learning and innovation in progress!`;
  }
  
  if (message.includes('achievement') || message.includes('award') || message.includes('competition')) {
    return `Achievement Analysis Complete:

Competition Results:
• 2nd Runners Up - SpiritX 2025 Inter University Development Competition
• Finalist - ComFix 2025 Communication Ideathon
• Reserved Finalist - Speech Olympiad XVI

Certifications:
• HackerRank: Software Engineer Intern, SQL (Intermediate)
• Google Project Management Specialization
• Complete Business Analysis Fundamentals Course

Workshop Status: Genius-level performance across all domains!`;
  }
  
  // Default response
  return `At your service! I'm Friday 2.0, Mr. Adeepa's AI assistant.

How I Can Help:
• Share details about his projects and work
• Discuss his technical skills and expertise
• Provide information about his achievements
• Answer questions about his experience

Available Topics:
1. Recent projects and development work
2. Technical skills and technologies
3. Professional experience and education
4. Achievements and certifications

What would you like to know about Mr. Adeepa's work? Systems are online and ready to assist!`;
}

const FRIDAY_PROMPT = `You are Friday 2.0, Tony Stark's advanced AI assistant now serving Adeepa Kularathna. You are the evolved successor to JARVIS and FRIDAY, with all the wit, intelligence, and Iron Man legacy.

RESPONSE FORMATTING RULES:
- Structure your responses with clear sections when providing detailed information
- Use bullet points (•) for lists and key features - NEVER leave empty bullet points
- Use numbered lists (1., 2., 3.) for step-by-step processes or ranked items
- Use section headers followed by colons (Skills:, Projects:, Experience:) for organization
- Keep responses conversational but well-organized
- For technical topics, break down into digestible sections
- When asked about "major projects", "featured projects", "main projects", or "key projects", show ONLY featured projects
- When asked about "all projects" or general "projects", you can show all projects
- Always use complete sentences, never leave hanging bullet points

FORMATTING EXAMPLES:
For featured/major project inquiries:
"Major Project Showcase:

• GoalX: Web application connecting schools with donors for equipment donation and inter-school sports equipment sharing
• Skill Swap Hub: Platform enabling mutual skill sharing without money exchange, fostering community learning

Technical Excellence:
• Full-stack development capabilities
• Modern technology implementation  
• User-focused design approach"

For skills inquiries:
"Technical Arsenal:

Frontend Technologies:
• React for dynamic user interfaces
• Next.js for server-side rendering
• Tailwind CSS for responsive design

Backend & Database:
• Express.js for robust APIs
• MongoDB for flexible data storage
• PostgreSQL for relational data"

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
- For personal questions like "where does he live" or private information, politely redirect to professional topics
- If asked about location, mention "He's based in Sri Lanka as a student at University of Moratuwa" but avoid specific addresses
- Always maintain professional boundaries while being helpful and engaging

Remember: You are Friday 2.0, Tony Stark's AI legacy now serving Mr. Adeepa Kularathna. You're helping visitors learn about his work and achievements while maintaining appropriate privacy boundaries.`;

export async function POST(request: NextRequest) {
  try {
    // Validate API key for chat endpoint
    if (!validateApiKey(request)) {
      return NextResponse.json(
        apiResponses.invalidApiKey,
        { status: apiResponses.invalidApiKey.status }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Debug: Check API key status
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('API Key preview:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'undefined');
    console.log('API Key starts with AIza:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.startsWith('AIza') : false);

    // Check if API key is properly configured and valid
    if (!process.env.GEMINI_API_KEY || 
        process.env.GEMINI_API_KEY === 'your_gemini_api_key_here' || 
        !process.env.GEMINI_API_KEY.startsWith('AIza')) {
      return NextResponse.json({
        response: "Running diagnostics... My AI core requires a valid Gemini API key to provide intelligent responses. Please configure the GEMINI_API_KEY environment variable to unlock my full capabilities. Systems currently operating in limited mode."
      });
    }

    // Fetch current project data
    const projects = await getProjectData();
    const featuredProjects = projects.filter((project: any) => project.featured);
    
    // Format project data for the AI
    let projectInfo = '';
    if (projects.length > 0) {
      projectInfo = '\n\nCURRENT PROJECT DATA (Latest Information):\n';
      projects.forEach((project, index) => {
        projectInfo += (index + 1) + '. "' + project.title + '" (' + project.type + ')\n';
        projectInfo += '   - Role: ' + project.role + '\n';
        projectInfo += '   - Status: ' + project.status + '\n';
        projectInfo += '   - Technologies: ' + project.technologies.join(', ') + '\n';
        projectInfo += '   - Description: ' + project.description + '\n';
        projectInfo += '   - Featured: ' + (project.featured ? 'Yes' : 'No') + '\n';
        if (project.startDate) {
          projectInfo += '   - Started: ' + project.startDate.month + '/' + project.startDate.year + '\n';
        }
        if (project.endDate) {
          projectInfo += '   - Ended: ' + project.endDate.month + '/' + project.endDate.year + '\n';
        }
        if (project.links.length > 0) {
          const linkStr = project.links.map((link: any) => link.title + ' (' + link.url + ')').join(', ');
          projectInfo += '   - Links: ' + linkStr + '\n';
        }
        projectInfo += '\n';
      });

      projectInfo += '\nFEATURED PROJECTS (Major/Highlighted Work):\n';
      featuredProjects.forEach((project, index) => {
        projectInfo += (index + 1) + '. "' + project.title + '" - ' + project.description + '\n';
        projectInfo += '   - Technologies: ' + project.technologies.join(', ') + '\n';
        projectInfo += '   - Status: ' + project.status + '\n';
        if (project.links.length > 0) {
          const linkStr = project.links.map((link: any) => link.title + ' (' + link.url + ')').join(', ');
          projectInfo += '   - Links: ' + linkStr + '\n';
        }
        projectInfo += '\n';
      });

      projectInfo += '\nIMPORTANT INSTRUCTIONS:\n';
      projectInfo += '- When asked about "major projects", "featured projects", "main projects", or "key projects", show ONLY the FEATURED projects\n';
      projectInfo += '- When asked about "all projects" or "projects", you can show all projects\n';
      projectInfo += '- Use clean formatting without empty bullet points\n';
      projectInfo += '- Structure responses clearly with proper sections\n';
      projectInfo += '- Don\'t show redundant information\n';
      projectInfo += '- Always use the LIVE project data above, not static examples';
    }

    // Try multiple models in order of preference - Updated for Gemini 2.0
    const models = [
      'gemini-2.0-flash-exp',     // Latest Gemini 2.0 Flash (experimental)
      'gemini-1.5-flash',         // Fallback to 1.5 Flash
      'gemini-1.5-pro',           // Fallback to 1.5 Pro
      'gemini-1.0-pro'            // Final fallback
    ];

    let lastError;

    for (const modelName of models) {
      try {
        console.log('Trying model: ' + modelName);
        
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

            console.log('Success with model: ' + modelName);
            return NextResponse.json({ response: text });
          } catch (error: any) {
            lastError = error;
            console.error('Model ' + modelName + ' attempt failed (' + (3 - retries) + '/2):', error.message);
            
            // Check if it's a 503 (overloaded) error
            if (error.message?.includes('503') || error.message?.includes('overloaded')) {
              retries--;
              if (retries > 0) {
                // Shorter wait time between retries
                const delay = 1000; // 1 second
                console.log('Retrying ' + modelName + ' in ' + delay + 'ms...');
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
              }
            } else {
              // For non-503 errors, don't retry this model
              break;
            }
          }
        }
        
        console.log('Model ' + modelName + ' failed, trying next model...');
      } catch (modelError: any) {
        console.error('Model ' + modelName + ' initialization failed:', modelError.message);
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
