import type { Course } from "@/types/course"

// ═══════════════════════════════════════════════════════════════════════════════
// COOKIN TRAINING - SAINT VISION GROUP LLC
// Complete Training System: Crash Course (8 Hours) + Elite Certification (16 Hours)
// ═══════════════════════════════════════════════════════════════════════════════

export const crashCourseData: Course = {
  id: "crash-course",
  title: "Cookin Crash Course",
  subtitle: "The 8-Hour Intensive That Changes Everything",
  duration: "8 hours",
  icon: "🔥",
  color: "from-orange-500 to-red-600",
  modules: [
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 1: HFCI DOCUMENT PREPARATION - THE FOUNDATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-1",
      title: "HFCI Document Preparation - The Foundation",
      duration: "60 min",
      sections: [
        {
          type: "content",
          title: "HFCI LLC - Where It All Begins",
          content: `═══════════════════════════════════════════════════════════════
HFCI, LLC - THE FOUNDATIONAL LEAD ENGINE
LEGAL DOCUMENT PREPARATION SINCE 2003
═══════════════════════════════════════════════════════════════

📍 3355 Spring Mountain Rd, Las Vegas, NV 89103
📞 877-630-6177 | info@hfcillc.com | www.hfcillc.com

**CRITICAL UNDERSTANDING:**
HFCI is a HUGE part of the foundational process and where a LOT of traffic comes in via mail and phone. Direct mailings generate calls that feed the entire ecosystem.

═══════════════════════════════════════════════════════════════
WHAT IS HFCI?
═══════════════════════════════════════════════════════════════

HFCI LLC provides:
• Business Consulting & Managed Services
• Legal Document Preparation
• Direct Mail Marketing Campaigns
• Inbound Phone Lead Generation
• Client Services & Support

**The Lead Generation Engine:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Direct mail campaigns go out to distressed homeowners
2. Recipients call 877-630-6177 seeking help
3. Calls come into Client Services (YOU)
4. You gather info, run lender calls, create opportunities
5. Qualified leads → GHL Pipeline → Saint Vision Ecosystem
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

═══════════════════════════════════════════════════════════════
HOW TO ANSWER HFCI CALLS
═══════════════════════════════════════════════════════════════

**SCRIPT (Word for Word):**
"Thank you for calling Client Services, this is [YOUR NAME], how may I assist you today?"

**WHY "Client Services"?**
We have multiple products we offer. Once the caller provides their Client ID, move to the next step.

**YOUR JOB ON EVERY CALL:**
1. Take an application
2. Make a lender call (covered in Module 7)
3. Identify opportunities for other Saint Vision services

═══════════════════════════════════════════════════════════════
THE FOUR-SYSTEM FOUNDATION
═══════════════════════════════════════════════════════════════

Master this sequence. Every single day. No exceptions.

ORDER 1: **APOLLO** - Find Leads
• Lead generation and prospecting
• This is where your pipeline starts
• Quality over quantity always

ORDER 2: **BLB (BuilderLeadBoost)** - Track & Qualify  
• Lead intelligence and scoring
• Notes, status tracking, qualification
• Write detailed notes after EVERY interaction

ORDER 3: **GHL (GoHighLevel)** - Communicate
• Call, text, email, follow up
• ALL client communication happens here
• Check tasks and conversations FIRST each day

ORDER 4: **HFCI** - Process Deals
• Deal paperwork and document preparation
• File completion and submission
• APPROVED DEALS ONLY

**BEGINNER TIP:** Breaking this order creates chaos. Follow it religiously.

═══════════════════════════════════════════════════════════════
THE LENDER CALL - HFCI's SECRET WEAPON
═══════════════════════════════════════════════════════════════

**Why the Lender Call is Critical:**
This is where we separate ourselves from everyone else. This is our competitive advantage.

**The lender call is the most important phone call the homeowner will make this month.**

**What It Accomplishes:**
1. Gets up-to-date information on the homeowner
2. Helps the homeowner hear their current mortgage situation
3. Creates options to be discussed

**Script to Set It Up:**
"This is the most important phone call you will make this month. We're going to gather accurate, up-to-date information to better your ability to navigate through the customer service department."

"We will ask 20 unique questions such as: Who's your trustee? Maturity dates? Total delinquent amount owed? Is there a sale date?"

"[Client's Name] - Trust me, I'll do all the work. All I need is the last 4 digits of your Social and your Loan Number."

═══════════════════════════════════════════════════════════════
HFCI SERVICES REFERENCE
═══════════════════════════════════════════════════════════════

**Data Preparation**
Comprehensive analysis and systematic organization of client financial information

**Lender Confirmation**
Professional liaison services with financial institutions to verify account standings

**Management Intel**
Strategic oversight and detailed reporting of client assets

**Process Updates**
Dedicated client communication throughout 200-day documentation period

**Pivot Corrections**
Dynamic refinement of documentation processes based on feedback

═══════════════════════════════════════════════════════════════
MAINTAINING & GROWING HFCI
═══════════════════════════════════════════════════════════════

**HFCI LLC remains a structured business reference** - even as we expand CookinCapital and Saint Vision services.

**Why HFCI Matters:**
• Established since 2003
• Proven track record in legal document prep
• Trusted brand for distressed homeowners
• Massive lead generation engine
• Foundation that supports everything else

**The Strategy:**
Keep HFCI running efficiently while cross-selling Saint Vision ecosystem products:
• Commercial lending (CookinCapital)
• Investment products (Fixed Return Fund, Syndicate)
• Real estate opportunities
• AI/SaaS platform (SaintSal)

═══════════════════════════════════════════════════════════════
KEY TAKEAWAYS
═══════════════════════════════════════════════════════════════

✓ HFCI generates massive inbound traffic via direct mail
✓ Every call is an opportunity to help AND cross-sell
✓ Follow the 4-system order religiously
✓ The lender call is our competitive advantage
✓ HFCI is the foundation - maintain it while we grow
✓ Use "Client Services" when answering the phone

**Remember:** Direct mail → Phone calls → Applications → Lender calls → Opportunities`,
        },
        {
          type: "quiz",
          title: "HFCI Foundation Quiz",
          questions: [
            {
              question: "What is the correct way to answer an HFCI call?",
              options: [
                "Thank you for calling HFCI, how can I help?",
                "Thank you for calling Client Services, this is [YOUR NAME], how may I assist you today?",
                "HFCI LLC, what's your Client ID?",
                "Hello, this is [YOUR NAME] from Saint Vision Group",
              ],
              correct: 1,
            },
            {
              question: "What is the correct order of the Four-System Foundation?",
              options: [
                "GHL → BLB → Apollo → HFCI",
                "Apollo → GHL → BLB → HFCI",
                "Apollo → BLB → GHL → HFCI",
                "HFCI → Apollo → BLB → GHL",
              ],
              correct: 2,
            },
            {
              question: "Why is the lender call HFCI's competitive advantage?",
              options: [
                "It's faster than other companies",
                "We gather accurate, up-to-date information instead of just guessing",
                "It makes us money",
                "Clients prefer talking to lenders",
              ],
              correct: 1,
            },
            {
              question: "How does HFCI generate leads?",
              options: [
                "Social media advertising",
                "Cold calling",
                "Direct mail campaigns that generate inbound phone calls",
                "TV commercials",
              ],
              correct: 2,
            },
            {
              question: "What should you do on EVERY HFCI inbound call?",
              options: [
                "Just take their information and hang up",
                "Take an application, make a lender call, and identify opportunities",
                "Sell them on CookinCapital immediately",
                "Transfer them to a supervisor",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 2: COMMISSION STRUCTURE - HOW YOU GET PAID
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-2",
      title: "Commission Structure - How You Get Paid",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "Understanding the Commission Split",
          content: `═══════════════════════════════════════════════════════════════
COOKINCAPITAL COMMISSION STRUCTURE
NO CAP. JUST RESULTS. 🧢
═══════════════════════════════════════════════════════════════

**TWO TYPES OF DEALS:**
1. System Leads (Marketing, PartnerTech, Ads)
2. You Bring It (Your Deal, Your Client)

═══════════════════════════════════════════════════════════════
SYSTEM LEAD COMMISSION SPLIT
═══════════════════════════════════════════════════════════════

When leads come from Company marketing, PartnerTech, or ads:

**Top-Level Split:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cap (Owner): 35%
• JR (Closing Manager): 20%
• Darren (Operations): 20%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Fixed Allocations (EVERY DEAL):**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• House (Overhead): 10%
• Grace (CIO/Investor Oversight): 5%
• David (Legal Oversight): 5%
• Girl on File (Nicole/Jean): 5%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TOTAL: 100%**

═══════════════════════════════════════════════════════════════
YOU BRING IT COMMISSION SPLIT
═══════════════════════════════════════════════════════════════

When YOU originate the deal (your client, your relationship):

**Top-Level Split:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• YOU (Originator): 35%
• Cap (Owner): 20%
• JR (Close/Sign-off): 10%
• Darren (Operations): 10%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Fixed Allocations (EVERY DEAL):**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• House: 10%
• Grace: 5%
• David: 5%
• Girl on File: 5%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TOTAL: 100%**

═══════════════════════════════════════════════════════════════
REAL MONEY EXAMPLE: $50,000 COMMISSION
═══════════════════════════════════════════════════════════════

**SYSTEM LEAD:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• YOU (New Director): $0
• Cap: $17,500 (35%)
• JR: $10,000 (20%)
• Darren: $10,000 (20%)
• House: $5,000 (10%)
• Grace: $2,500 (5%)
• David: $2,500 (5%)
• Girl on File: $2,500 (5%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**TOTAL: $50,000**

**YOU BRING IT:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• YOU (New Director): $17,500 (35%)
• Cap: $10,000 (20%)
• JR: $5,000 (10%)
• Darren: $5,000 (10%)
• House: $5,000 (10%)
• Grace: $2,500 (5%)
• David: $2,500 (5%)
• Girl on File: $2,500 (5%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**TOTAL: $50,000**

═══════════════════════════════════════════════════════════════
THE GOLDEN RULE
═══════════════════════════════════════════════════════════════

**BRING DEALS = 35% | WORK SYSTEM LEADS = TEAM SPLIT**

If you want to earn big, originate your own deals. Network, build relationships, and bring business to the table.

System leads are great for steady work, but YOUR deals are where you build wealth.

═══════════════════════════════════════════════════════════════
PAYMENT TERMS
═══════════════════════════════════════════════════════════════

**When You Get Paid:**
Commissions are paid within 15 business days of Company receiving payment from the lender or closing agent.

**Commission Basis:**
All contractors are compensated on a commission basis. There are no base salaries, draws, or guaranteed payments. You earn when deals close.

**Disputes:**
Must be submitted in writing within 30 days of payment.

═══════════════════════════════════════════════════════════════
CONTRACTOR CLASSIFICATIONS
═══════════════════════════════════════════════════════════════

**Directors:**
Senior personnel responsible for origination, operations, and closing (JR, Darren, Sean)

**Capital Advisors:**
Deal originators who bring new business (YOU can be here!)

**Processing/Administrative:**
File management and loan processing (Nicole, Jean - "Girl on File")

═══════════════════════════════════════════════════════════════
KEY TAKEAWAYS
═══════════════════════════════════════════════════════════════

✓ System Leads = Team split (0% for you as new director)
✓ You Bring It = 35% for YOU
✓ Every file has fixed allocations (Girl on File, Grace, David, House)
✓ Payment within 15 days of Company receiving funds
✓ Commission-based only - no salary, no draws
✓ Want to earn big? Bring your own deals!

**NO CAP. JUST RESULTS.** 🧢`,
        },
        {
          type: "quiz",
          title: "Commission Structure Quiz",
          questions: [
            {
              question: "If you originate your own $50,000 deal, how much do YOU earn?",
              options: [
                "$0 - System leads only pay the team",
                "$10,000 - Standard commission",
                "$17,500 - Your 35% origination fee",
                "$25,000 - Half the commission",
              ],
              correct: 2,
            },
            {
              question: "What percentage does 'Girl on File' receive on EVERY deal?",
              options: [
                "0% - Only on special deals",
                "5% - Fixed allocation",
                "10% - She processes everything",
                "20% - She's a director",
              ],
              correct: 1,
            },
            {
              question:
                "When working a System Lead (marketing generated), what is YOUR commission as a new Capital Advisor?",
              options: [
                "35% - You closed it",
                "20% - Team member rate",
                "10% - New advisor rate",
                "$0 - Team split only",
              ],
              correct: 3,
            },
            {
              question: "How many business days after Company receives payment do you get paid?",
              options: ["Same day", "7 business days", "15 business days", "30 business days"],
              correct: 2,
            },
            {
              question: "What is the golden rule of CookinCapital commissions?",
              options: [
                "System leads pay the most",
                "Everyone gets equal split",
                "BRING DEALS = 35% | WORK SYSTEM LEADS = TEAM SPLIT",
                "Only directors earn commissions",
              ],
              correct: 2,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 3: WELCOME & THE ECOSYSTEM
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-3",
      title: "Welcome & The Ecosystem",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "Welcome to Saint Vision Group",
          content: `═══════════════════════════════════════════════════════════════
WELCOME TO SAINT VISION GROUP LLC
THE CAPITAL OF CAPITAL™
═══════════════════════════════════════════════════════════════

You didn't just get a job — you joined a movement.

We are the bridge between financial distress and financial freedom. Every person you talk to is someone's mother, father, brother, sister. They're scared. They need help. And YOU are their lifeline.

OUR MISSION:
To provide comprehensive financial solutions that transform lives — from mortgage assistance to business funding to wealth building.

THE THREE PILLARS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. HFCI LLC (Document Prep & Mortgage Assistance)
   • Foreclosure prevention
   • Loan modification assistance  
   • Bankruptcy protection guidance
   • Legal document preparation
   • 200-day comprehensive process

2. SAINT VISION GROUP (Lending & Investments)
   • Business loans ($5K - $10M+)
   • Real estate financing
   • 9-12% Fixed Return Investment Fund
   • Lending Syndicate opportunities
   • UPREIT & 1031 Exchange solutions

3. COOKINCAP / COOKIN KNOWLEDGE (Commercial Capital)
   • Equipment Financing
   • Working Capital / MCA
   • Term Loans
   • SBA Loans
   • Business Lines of Credit
   • Invoice Factoring
   • Real Estate Finance

WEBSITES:
• cookincap.com - Commercial lending portal
• cookinknowledge.com - Client-facing funding options
• saintsal.ai - AI-powered client assistance
• saintvisiongroup.com - Main corporate site`,
        },
        {
          type: "content",
          title: "The Client Journey",
          content: `═══════════════════════════════════════════════════════════════
THE CLIENT JOURNEY - HOW WE HELP EVERYONE
═══════════════════════════════════════════════════════════════

Every client enters through ONE door but can access the ENTIRE ecosystem.

THE FLOW:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENTRY → DISCOVERY → SOLUTION → CROSS-SELL → RETENTION

STEP 1: ENTRY POINT
Client comes to us for help with:
• Mortgage distress (behind on payments)
• Foreclosure notice received
• Need business capital
• Want to invest money
• Real estate transaction

STEP 2: DISCOVERY
During our process, we uncover OTHER needs:
• "I own a business" → Commercial lending opportunity
• "I have savings" → Investment opportunity
• "I want to buy property" → Real estate lending
• "I need equipment" → Equipment financing

STEP 3: SOLUTION
We solve their IMMEDIATE problem first:
• Get them into the right program
• Start the process
• Build trust through action

STEP 4: CROSS-SELL
Once trust is established, introduce other solutions:
• "By the way, you mentioned your business needs capital..."
• "We also have investment options for that settlement money..."
• "Our real estate team can help with that property purchase..."

STEP 5: RETENTION
Client becomes a LIFETIME relationship:
• They refer friends and family
• They come back for future needs
• They become advocates for our brand

THIS IS HOW WE HELP LITERALLY EVERYONE.`,
        },
        {
          type: "content",
          title: "Cross-Platform Tags",
          content: `═══════════════════════════════════════════════════════════════
CROSS-PLATFORM TAG SYSTEM
═══════════════════════════════════════════════════════════════

Tags are how we ensure NO opportunity falls through the cracks.

THE TAGS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SVG-LENDING
• Client needs business or real estate loan
• Handoff to JR / Lending Team
• Products: Term loans, equipment, SBA, bridge, construction

SVG-INVEST  
• Client has capital to deploy
• Investment Team handles
• Products: Fixed Return Fund, Syndicate, UPREIT

SVG-RE
• Client buying or selling property
• Real Estate Team
• Services: Wholesaling, brokerage, acquisitions

COOKIN-CAP
• Commercial/MCA/SBA needs
• Commercial Team
• Products: MCA, working capital, lines of credit

HFCI-ACTIVE
• Currently in HFCI program
• Document prep ongoing
• Monitor for cross-sell opportunities

HOW TO TAG:
1. Listen for buying signals during conversation
2. Document the signal verbatim in notes
3. Apply the appropriate tag in GHL
4. Brief handoff notes for receiving team
5. Warm transfer when possible

EXAMPLE:
Client says: "I have rental properties that need renovation"
Action: Apply SVG-LENDING + SVG-RE tags
Notes: "Client owns 3 rentals, needs rehab financing for 2 of them. Interested in discussing with lending team."`,
        },
        {
          type: "quiz",
          title: "Ecosystem Knowledge Check",
          questions: [
            {
              question: "What are the THREE pillars of Saint Vision Group?",
              options: [
                "Sales, Marketing, Operations",
                "HFCI, Saint Vision Group, CookinCap",
                "Lending, Investing, Insurance",
                "Mortgages, Cars, Personal Loans",
              ],
              correct: 1,
            },
            {
              question: "What is HFCI's primary function?",
              options: [
                "Business loans",
                "Document Prep & Mortgage Assistance",
                "Real estate sales",
                "Investment management",
              ],
              correct: 1,
            },
            {
              question: "What does the tag 'SVG-LENDING' indicate?",
              options: [
                "Client has capital to invest",
                "Client needs business/RE loan",
                "Client is selling property",
                "Client wants MCA only",
              ],
              correct: 1,
            },
            {
              question: "What is Saint Vision Group's tagline?",
              options: ["We Get It Done", "The Capital of Capital™", "Your Money Partner", "Finance First"],
              correct: 1,
            },
            {
              question: "What is the typical HFCI process duration?",
              options: ["30 days", "90 days", "200 days", "365 days"],
              correct: 2,
            },
            {
              question: "When a client says 'I have savings doing nothing,' which tag applies?",
              options: ["SVG-LENDING", "SVG-INVEST", "COOKIN-CAP", "HFCI-ACTIVE"],
              correct: 1,
            },
            {
              question: "What is the correct client journey order?",
              options: [
                "Solution → Entry → Discovery",
                "Entry → Discovery → Solution → Cross-Sell → Retention",
                "Cross-Sell → Entry → Retention",
                "Discovery → Solution → Entry",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 2: THE PRE-QUAL FORM & GHL PIPELINE
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-4",
      title: "Pre-Qual Form & GHL Pipeline",
      duration: "60 min",
      sections: [
        {
          type: "content",
          title: "The Pre-Qual Form - Where It All Begins",
          content: `═══════════════════════════════════════════════════════════════
THE PRE-QUALIFICATION FORM
WHERE EVERY CLIENT JOURNEY BEGINS
═══════════════════════════════════════════════════════════════

The pre-qual form is the ENTRY POINT for every new lead. When someone fills this out on cookinknowledge.com or saintvisiongroup.com, they automatically enter our GHL system.

WHAT THE FORM CAPTURES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL INFORMATION:
□ Full Legal Name
□ Email Address
□ Phone Number
□ Best Time to Contact

BUSINESS INFORMATION (if applicable):
□ Business Name
□ Time in Business
□ Monthly Revenue
□ Industry Type

FUNDING NEEDS:
□ Amount Requested ($5,000 - $1,000,000+)
□ Purpose of Funds
□ Timeline (How soon do you need funding?)

CREDIT PROFILE:
□ Estimated Credit Score Range
□ Any Bankruptcies?
□ Current Monthly Debt Obligations

THE MOMENT THEY SUBMIT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Lead is INSTANTLY created in GHL
2. They receive automated welcome email
3. They get a text confirmation
4. Lead appears in "New Leads" pipeline stage
5. Assignment notification goes to team
6. 5-MINUTE CONTACT WINDOW BEGINS

This is why speed matters. The faster you call, the higher the close rate.`,
        },
        {
          type: "content",
          title: "GHL Pipeline Stages",
          content: `═══════════════════════════════════════════════════════════════
GO HIGH LEVEL (GHL) PIPELINE
YOUR COMMAND CENTER
═══════════════════════════════════════════════════════════════

Every lead moves through defined stages. Your job is to move them forward.

THE PIPELINE STAGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STAGE 1: NEW LEAD ⭐
• Just submitted form
• No contact yet
• ACTION: Call within 5 minutes
• If no answer: Text + Email + Voicemail

STAGE 2: CONTACTED 📞
• First contact made
• Initial conversation had
• ACTION: Qualify their needs
• Schedule follow-up if needed

STAGE 3: QUALIFIED ✓
• Needs identified
• Product match determined
• Docs requested
• ACTION: Send doc checklist

STAGE 4: APPLICATION SUBMITTED 📄
• All docs received
• Application completed
• Submitted to lender/processor
• ACTION: Set expectations on timeline

STAGE 5: IN UNDERWRITING 🔍
• Being reviewed
• May need additional docs (stips)
• ACTION: Respond to stips within 24 hrs
• Update client every 48 hours

STAGE 6: APPROVED ✅
• Deal approved
• Terms confirmed
• ACTION: Review terms with client
• Schedule closing

STAGE 7: FUNDED 💰
• Money disbursed
• Deal complete
• ACTION: Congratulate client
• Ask for referrals
• Tag for cross-sell opportunities

STAGE 8: CLOSED - WON/LOST
• Final disposition
• Document outcome
• ACTION: If lost, note reason for future reference`,
        },
        {
          type: "content",
          title: "GHL Automation & Tasks",
          content: `═══════════════════════════════════════════════════════════════
GHL AUTOMATION - WORKING SMARTER
═══════════════════════════════════════════════════════════════

Our system is built to help you. USE IT.

AUTOMATED SEQUENCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEW LEAD SEQUENCE:
• Immediate: Welcome email sent
• Immediate: Text confirmation sent
• 5 min: Alert to assigned rep
• 1 hour: Follow-up text if no contact
• 24 hours: "Still interested?" email
• 48 hours: Final attempt sequence

DOCUMENT REQUEST SEQUENCE:
• Immediate: Doc checklist email
• 24 hours: Reminder text
• 48 hours: Follow-up call task created
• 72 hours: Escalation if no docs

APPLICATION SUBMITTED SEQUENCE:
• Immediate: Confirmation email to client
• 48 hours: Status update email
• Ongoing: Weekly status updates until decision

TASKS IN GHL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check your tasks EVERY MORNING:
□ New lead follow-ups
□ Document collection reminders
□ Status update calls
□ Stip response deadlines
□ Closing appointments

COMPLETING TASKS:
• Click task when done
• Add notes about outcome
• Set next task if needed
• NEVER leave a lead without a next action

YOUR DAILY GHL ROUTINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Check new leads - Call immediately
2. Review tasks - Complete all due today
3. Update pipeline - Move deals to correct stage
4. Check stips - Respond same day
5. End of day - Clear inbox, set tomorrow's priorities`,
        },
        {
          type: "content",
          title: "CRM Best Practices",
          content: `═══════════════════════════════════════════════════════════════
CRM EXCELLENCE - THE STANDARD
═══════════════════════════════════════════════════════════════

Your CRM habits determine your success. Period.

CONTACT RECORD REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVERY contact MUST have:
□ Full legal name
□ Primary phone number
□ Email address
□ Lead source
□ Assigned rep
□ Current pipeline stage
□ Last contact date
□ Next action scheduled

NOTES - WHAT TO DOCUMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every interaction gets a note:
• Date and time of contact
• Method (call, text, email)
• Summary of conversation
• Buying signals identified (verbatim)
• Products discussed
• Objections raised
• Next steps agreed
• Follow-up date set

EXAMPLE NOTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12/15 2:30pm - Phone Call
Spoke with John about working capital needs. Business is a restaurant, 3 years in operation, doing $45K/month revenue. Needs $75K for kitchen equipment upgrade. 
BUYING SIGNAL: "I also have two rental properties that need work" - SVG-LENDING opportunity
Sending doc checklist now. F/U scheduled for 12/17 to collect docs.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAGGING:
• Apply tags in real-time
• Don't wait until end of call
• Multiple tags are OK
• Update tags as situation evolves`,
        },
        {
          type: "quiz",
          title: "GHL & Pipeline Mastery",
          questions: [
            {
              question: "How quickly should you contact a new lead?",
              options: ["Within 24 hours", "Within 1 hour", "Within 5 minutes", "Same day"],
              correct: 2,
            },
            {
              question: "What happens IMMEDIATELY when a pre-qual form is submitted?",
              options: [
                "Nothing until you call",
                "Lead created in GHL + welcome email + text confirmation",
                "Just an email is sent",
                "Lead goes to a queue",
              ],
              correct: 1,
            },
            {
              question: "How often should you update clients on pending applications?",
              options: ["Weekly", "Every 48 hours", "Monthly", "Only when there's news"],
              correct: 1,
            },
            {
              question: "What should EVERY contact record have?",
              options: [
                "Just phone number",
                "Full name, phone, email, lead source, stage, last contact, next action",
                "Only email",
                "Just notes",
              ],
              correct: 1,
            },
            {
              question: "What is the correct pipeline order?",
              options: [
                "Contacted → New Lead → Qualified",
                "New Lead → Contacted → Qualified → App Submitted → Underwriting → Approved → Funded",
                "Qualified → Submitted → New Lead",
                "Funded → Approved → Submitted",
              ],
              correct: 1,
            },
            {
              question: "How quickly must you respond to stips?",
              options: ["Within 1 week", "Within 24 hours", "Within 72 hours", "When you have time"],
              correct: 1,
            },
            {
              question: "What should you do if you identify a buying signal?",
              options: [
                "Ignore it",
                "Document verbatim in notes and apply appropriate tag",
                "Wait until the deal closes",
                "Tell your manager later",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 3: LOAN PRODUCTS - PART 1
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-5",
      title: "Loan Products Part 1: Working Capital & Term Loans",
      duration: "60 min",
      sections: [
        {
          type: "content",
          title: "Working Capital",
          content: `═══════════════════════════════════════════════════════════════
WORKING CAPITAL
KEEP THE BUSINESS RUNNING
═══════════════════════════════════════════════════════════════

Working capital is the lifeblood of any business. It's the money available for day-to-day operations.

WHAT IS WORKING CAPITAL?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Working Capital = Current Assets - Current Liabilities

It's the funds available to:
• Pay suppliers
• Cover payroll
• Manage inventory
• Handle unexpected expenses
• Seize growth opportunities

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amount: $5,000 - $1,000,000
Terms: 3 - 24 months
Speed: Funding in as fast as 24-48 hours
Credit: All credit types considered

IDEAL CLIENT:
• Business experiencing cash flow gaps
• Seasonal business needing bridge funding
• Company with growth opportunity requiring quick capital
• Business waiting on receivables

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 3-6 months business bank statements
□ Government-issued ID
□ Voided check
□ Business license (if requested)
□ Simple 1-page application

QUALIFYING CRITERIA:
• 6+ months in business
• $10,000+ monthly revenue
• Active business bank account
• No open bankruptcies

CLIENT PITCH:
"Working capital gives you the flexibility to manage your day-to-day operations without stress. Whether it's covering payroll, stocking inventory, or handling an unexpected expense - you'll have the funds available when you need them. And the best part? We can get you funded in as little as 24 hours."`,
        },
        {
          type: "content",
          title: "Merchant Cash Advance (MCA)",
          content: `═══════════════════════════════════════════════════════════════
MERCHANT CASH ADVANCE (MCA)
FAST CAPITAL BASED ON REVENUE
═══════════════════════════════════════════════════════════════

MCA is not a loan - it's an advance against future sales. This is our FASTEST product.

HOW IT WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. We purchase a portion of future receivables
2. Business receives lump sum upfront
3. Repayment is a fixed % of daily sales
4. When sales are up, you pay more
5. When sales are down, you pay less

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amount: $5,000 - $500,000
Factor Rate: 1.15 - 1.50
Holdback: 5% - 20% of daily deposits
Speed: Same day to 48 hours

IDEAL CLIENT:
• High volume of credit card sales
• Needs money FAST
• Credit challenged
• Seasonal fluctuations in revenue

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 3-4 months business bank statements
□ Government-issued ID
□ Voided check
□ Credit card processing statements (if applicable)

QUALIFYING CRITERIA:
• 4+ months in business
• $7,500+ monthly revenue
• Active business bank account

IMPORTANT - FACTOR RATE EXPLANATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If factor rate is 1.35 on $50,000:
$50,000 x 1.35 = $67,500 total payback
This is NOT an interest rate - it's the total cost.

CLIENT PITCH:
"MCA is perfect when you need capital quickly and want flexible repayment that adjusts with your sales. On busy days you pay a bit more, on slow days you pay less. It's designed to work WITH your cash flow, not against it."`,
        },
        {
          type: "content",
          title: "Term Loans",
          content: `═══════════════════════════════════════════════════════════════
TERM LOANS
STRUCTURED CAPITAL FOR GROWTH
═══════════════════════════════════════════════════════════════

Term loans are traditional business financing with fixed payments over a set period.

WHAT IS A TERM LOAN?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Fixed amount borrowed upfront
• Fixed repayment schedule
• Set term length (1-10 years)
• Predictable monthly payments
• Can be secured or unsecured

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amount: $5,000 - $5,000,000+
Terms: 1 - 10 years
Rates: 6% - 30% (credit dependent)
Speed: 3-14 days typically

IDEAL CLIENT:
• Established business (2+ years)
• Good credit profile (650+)
• Expansion projects
• Equipment purchases
• Real estate acquisition
• Debt consolidation

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 3-6 months business bank statements
□ 2 years business tax returns
□ 2 years personal tax returns
□ Profit & Loss statement
□ Balance sheet
□ Government-issued ID
□ Business license

QUALIFYING CRITERIA:
• 2+ years in business
• $250,000+ annual revenue
• 650+ credit score (typically)
• Positive cash flow

TERM LOAN VS MCA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Term Loan: Lower cost, longer process, better credit needed
MCA: Higher cost, faster funding, more flexible credit

CLIENT PITCH:
"A term loan gives you the stability of knowing exactly what your payment is every month. It's ideal for long-term investments in your business - expansion, equipment, or even acquiring another business. The rates are typically lower than shorter-term options, and terms can extend up to 10 years."`,
        },
        {
          type: "quiz",
          title: "Working Capital & Term Loans Check",
          questions: [
            {
              question: "What is working capital used for?",
              options: [
                "Only buying equipment",
                "Day-to-day operations, payroll, inventory, unexpected expenses",
                "Only real estate",
                "Only marketing",
              ],
              correct: 1,
            },
            {
              question: "How fast can working capital be funded?",
              options: ["30 days", "24-48 hours", "1 week", "3 months"],
              correct: 1,
            },
            {
              question: "What is a factor rate?",
              options: [
                "Monthly interest rate",
                "Multiplier showing total payback amount",
                "Credit score requirement",
                "Application fee",
              ],
              correct: 1,
            },
            {
              question: "If factor rate is 1.40 on $100,000, what is total payback?",
              options: ["$100,000", "$114,000", "$140,000", "$104,000"],
              correct: 2,
            },
            {
              question: "What's the minimum time in business for working capital?",
              options: ["1 month", "6 months", "2 years", "5 years"],
              correct: 1,
            },
            {
              question: "What documents are required for term loans?",
              options: [
                "Just bank statements",
                "Bank statements, tax returns, P&L, balance sheet, ID, license",
                "Only tax returns",
                "Just an application",
              ],
              correct: 1,
            },
            {
              question: "Who is the IDEAL client for MCA?",
              options: [
                "Startup with no revenue",
                "Business needing fast capital with flexible repayment",
                "Fortune 500 company",
                "Government agency",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 4: LOAN PRODUCTS - PART 2
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-6",
      title: "Loan Products Part 2: SBA, Equipment & Lines of Credit",
      duration: "60 min",
      sections: [
        {
          type: "content",
          title: "SBA Loans",
          content: `═══════════════════════════════════════════════════════════════
SBA LOANS
GOVERNMENT-BACKED BUSINESS FINANCING
═══════════════════════════════════════════════════════════════

SBA loans are partially guaranteed by the Small Business Administration, making them lower risk for lenders and better terms for borrowers.

WHY SBA LOANS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Lower down payments (as low as 10%)
• Longer repayment terms (up to 25 years)
• Competitive interest rates
• More flexible eligibility
• Government guarantee reduces lender risk

SBA LOAN TYPES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SBA 7(a) - Most Common
• Amount: Up to $5,000,000
• Terms: Up to 25 years (RE), 10 years (other)
• Use: Working capital, equipment, RE, acquisition

SBA 504
• Amount: $125,000 - $20,000,000
• Terms: 10-25 years
• Use: Major fixed assets, real estate

SBA Microloans
• Amount: Up to $50,000
• Terms: Up to 6 years
• Use: Small equipment, inventory, working capital

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ SBA Forms (1919, 1920, etc.)
□ 3 years business tax returns
□ 3 years personal tax returns
□ Business financial statements
□ Personal financial statement
□ Business plan (for startups)
□ Business debt schedule
□ Collateral documentation
□ Government-issued ID
□ Business licenses/registrations

QUALIFYING CRITERIA:
• 2+ years in business (preferred)
• 680+ credit score (typically)
• Profitable or clear path to profitability
• No recent bankruptcies
• Good character (no felonies)
• Must be US-based business

TIMELINE: 30-90 days typical

CLIENT PITCH:
"SBA loans offer the best rates and longest terms available in business lending because they're backed by the federal government. If you qualify, this is often the most affordable capital you can get. The process takes longer, but the savings over the life of the loan are significant."`,
        },
        {
          type: "content",
          title: "Equipment Financing",
          content: `═══════════════════════════════════════════════════════════════
EQUIPMENT FINANCING
GET THE TOOLS WITHOUT THE CASH OUTLAY
═══════════════════════════════════════════════════════════════

Equipment financing allows businesses to acquire necessary equipment without large upfront payments.

HOW IT WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Equipment serves as collateral
• Lower rates than unsecured financing
• Can finance new or used equipment
• Tax advantages (Section 179 deduction)
• Preserve cash for operations

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amount: $5,000 - $5,000,000+
Terms: 1 - 7 years
Down Payment: 0% - 20%
Speed: 24 hours - 2 weeks

TYPES OF EQUIPMENT WE FINANCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Construction equipment
• Restaurant/kitchen equipment
• Medical equipment
• Manufacturing machinery
• Vehicles and trucks
• Technology/computers
• Salon/spa equipment
• Agricultural equipment
• Basically ANY business equipment

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Equipment quote/invoice
□ 3-6 months business bank statements
□ Government-issued ID
□ Business license
□ Application

For larger amounts ($250K+):
□ Business tax returns
□ Financial statements

QUALIFYING CRITERIA:
• 1+ years in business
• $100,000+ annual revenue
• 550+ credit score (soft credit programs available)

CLIENT PITCH:
"Why deplete your cash reserves when the equipment can pay for itself? Equipment financing lets you get what you need today and pay for it with the revenue that equipment generates. Plus, you may be able to write off the entire purchase this tax year under Section 179."`,
        },
        {
          type: "content",
          title: "Business Line of Credit",
          content: `═══════════════════════════════════════════════════════════════
BUSINESS LINE OF CREDIT
FLEXIBLE CAPITAL ON DEMAND
═══════════════════════════════════════════════════════════════

A line of credit gives businesses access to a set amount of capital they can draw upon as needed.

HOW IT WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Approved for a credit limit
• Draw funds as needed
• Only pay interest on what you use
• Replenish as you pay down
• Revolving access to capital

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Amount: $5,000 - $500,000
Draw Period: 12 - 24 months
Repayment: Interest-only or principal + interest
Speed: 24-72 hours

IDEAL CLIENT:
• Seasonal businesses
• Businesses with variable cash flow
• Companies needing safety net
• Those with recurring short-term needs

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ 3-6 months business bank statements
□ Government-issued ID
□ Voided check
□ Business license

For larger limits:
□ Business tax returns
□ Personal tax returns

QUALIFYING CRITERIA:
• 6+ months in business
• $100,000+ annual revenue
• Active business bank account
• 600+ credit score

LINE OF CREDIT VS TERM LOAN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOC: Only pay for what you use, revolving, flexible
Term Loan: Lump sum, fixed payments, one-time

CLIENT PITCH:
"A line of credit is like having a financial safety net for your business. You have access to capital whenever you need it, but you only pay for what you actually use. It's perfect for managing cash flow gaps, handling unexpected expenses, or jumping on opportunities quickly."`,
        },
        {
          type: "content",
          title: "Invoice Factoring",
          content: `═══════════════════════════════════════════════════════════════
INVOICE FACTORING
TURN RECEIVABLES INTO CASH
═══════════════════════════════════════════════════════════════

Invoice factoring lets businesses sell their unpaid invoices to get immediate cash.

HOW IT WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. You complete work and invoice your customer
2. Instead of waiting 30-90 days for payment
3. You sell that invoice to us at a discount
4. We give you 80-95% of invoice value immediately
5. We collect from your customer
6. You get remaining balance minus fee

PRODUCT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Advance Rate: 80% - 95%
Fee: 1% - 5% (varies by invoice age)
Speed: 24-48 hours

IDEAL CLIENT:
• B2B businesses with slow-paying customers
• Contractors waiting on payment
• Staffing companies
• Manufacturers with net-30/60/90 terms

REQUIRED DOCUMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Outstanding invoices
□ Aging report
□ Customer list
□ Business bank statements
□ Government-issued ID

QUALIFYING CRITERIA:
• B2B business model
• Creditworthy customers
• Invoices are for completed work/delivered goods
• No liens on receivables

CLIENT PITCH:
"Why wait 30, 60, or 90 days to get paid? Invoice factoring turns your outstanding invoices into immediate cash. You get up to 95% of your invoice value within 24 hours, and we handle the collection. It's a great way to improve cash flow without taking on debt."`,
        },
        {
          type: "quiz",
          title: "SBA, Equipment & LOC Mastery",
          questions: [
            {
              question: "What makes SBA loans attractive?",
              options: [
                "Higher rates",
                "Lower down payments, longer terms, competitive rates",
                "No documentation required",
                "Instant funding",
              ],
              correct: 1,
            },
            {
              question: "What is the maximum SBA 7(a) loan amount?",
              options: ["$500,000", "$1,000,000", "$5,000,000", "$10,000,000"],
              correct: 2,
            },
            {
              question: "What serves as collateral in equipment financing?",
              options: ["Personal property", "The equipment being financed", "Business inventory", "Nothing"],
              correct: 1,
            },
            {
              question: "How does a line of credit differ from a term loan?",
              options: [
                "No difference",
                "LOC is revolving - only pay for what you use",
                "LOC has higher rates",
                "LOC takes longer to get",
              ],
              correct: 1,
            },
            {
              question: "What does invoice factoring do?",
              options: [
                "Creates new invoices",
                "Converts unpaid invoices to immediate cash",
                "Deletes invoices",
                "Sends invoices to customers",
              ],
              correct: 1,
            },
            {
              question: "What credit score is typically needed for SBA loans?",
              options: ["500+", "600+", "680+", "750+"],
              correct: 2,
            },
            {
              question: "What tax advantage does equipment financing offer?",
              options: ["No taxes ever", "Section 179 deduction", "Tax-free loan", "Double deduction"],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 5: REAL ESTATE FINANCING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-7",
      title: "Real Estate Financing",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "Real Estate Loan Types",
          content: `═══════════════════════════════════════════════════════════════
REAL ESTATE FINANCING
UNLOCK PROPERTY OPPORTUNITIES
═══════════════════════════════════════════════════════════════

We provide financing for ALL types of real estate investments.

LOAN TYPES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. DSCR LOANS (Debt Service Coverage Ratio)
• Based on property cash flow, NOT personal income
• No tax returns required
• For investment properties
• LTV up to 80%
• Great for investors with multiple properties

2. FIX & FLIP / BRIDGE LOANS
• Short-term (6-24 months)
• Purchase + Rehab financing
• Fast closing (7-14 days)
• Interest-only payments
• Exit strategy required

3. CONSTRUCTION LOANS
• Ground-up construction
• Draw schedule based on completion
• Converts to permanent financing
• For builders and developers

4. COMMERCIAL REAL ESTATE
• Retail, office, industrial, multifamily
• $500K - $50M+
• Terms: 5-25 years
• Based on property NOI

5. GROUND LEASES / LAND LOANS
• Raw land acquisition
• Development financing
• Higher rates, shorter terms

REQUIRED DOCUMENTS (General):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Purchase contract
□ Property photos
□ Rent roll (if applicable)
□ Personal financial statement
□ Entity documents (if applicable)
□ Experience resume (for fix & flip)
□ Scope of work (for rehab)
□ Exit strategy documentation`,
        },
        {
          type: "content",
          title: "DSCR & Fix-Flip Deep Dive",
          content: `═══════════════════════════════════════════════════════════════
DSCR LOANS - THE INVESTOR'S BEST FRIEND
═══════════════════════════════════════════════════════════════

DSCR = Net Operating Income / Annual Debt Service

Example:
Property generates $2,000/month rent = $24,000/year
Annual loan payment would be $18,000/year
DSCR = $24,000 / $18,000 = 1.33

Most lenders want DSCR of 1.0 - 1.25 minimum

DSCR LOAN DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Amount: $100K - $5M+
• LTV: Up to 80%
• Terms: 30-year amortization, 5-10 year terms
• Rates: 7% - 10% (market dependent)
• No personal income verification
• No tax returns needed
• Based entirely on property performance

═══════════════════════════════════════════════════════════════
FIX & FLIP LOANS - FAST MONEY FOR FAST PROJECTS
═══════════════════════════════════════════════════════════════

Perfect for investors who buy, renovate, and sell properties.

FIX & FLIP DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Purchase financing: Up to 90% of purchase price
• Rehab financing: Up to 100% of rehab costs
• ARV (After Repair Value): Up to 75% of ARV
• Terms: 6-18 months
• Interest-only payments
• Quick close: 7-14 days

REQUIREMENTS:
• Clear exit strategy (sell or refinance)
• Property must be non-owner occupied
• Experience resume (number of flips completed)
• Scope of work with budget
• Contractor bids (if using contractors)

CLIENT PITCH FOR DSCR:
"With DSCR loans, we don't care about your W-2 or tax returns. All that matters is that the property cash flows. If the rent covers the mortgage payment, you can qualify. This is perfect for self-employed investors or those with complex tax situations."

CLIENT PITCH FOR FIX & FLIP:
"We can fund up to 90% of your purchase and 100% of your rehab costs. That means you can get into deals with minimal cash out of pocket. We close fast - often in under two weeks - so you won't lose deals to slow financing."`,
        },
        {
          type: "quiz",
          title: "Real Estate Financing Check",
          questions: [
            {
              question: "What does DSCR stand for?",
              options: [
                "Direct Service Credit Rating",
                "Debt Service Coverage Ratio",
                "Down Service Credit Ratio",
                "Debt Structure Credit Rate",
              ],
              correct: 1,
            },
            {
              question: "What is the key advantage of DSCR loans?",
              options: [
                "Lowest rates available",
                "No personal income verification - based on property cash flow",
                "Instant funding",
                "No down payment",
              ],
              correct: 1,
            },
            {
              question: "How quickly can fix & flip loans close?",
              options: ["60-90 days", "30 days", "7-14 days", "6 months"],
              correct: 2,
            },
            {
              question: "What is typically required for fix & flip financing?",
              options: [
                "Just an application",
                "Exit strategy, scope of work, experience resume",
                "Only credit check",
                "5 years tax returns",
              ],
              correct: 1,
            },
            {
              question: "What does ARV stand for?",
              options: ["Annual Return Value", "After Repair Value", "Adjusted Real Value", "Approved Rental Value"],
              correct: 1,
            },
            {
              question: "If a property has NOI of $30,000/year and debt service of $25,000/year, what is the DSCR?",
              options: ["0.83", "1.20", "1.50", "0.50"],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 6: SALES & BUYING SIGNALS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-8",
      title: "Sales Mastery & Buying Signals",
      duration: "60 min",
      sections: [
        {
          type: "content",
          title: "The Consultative Approach",
          content: `═══════════════════════════════════════════════════════════════
SALES PHILOSOPHY
WE DON'T SELL. WE SOLVE.
═══════════════════════════════════════════════════════════════

Every client has a problem. Your job is to find it and fix it. The money follows the solution.

THE 70/30 RULE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Listen 70% of the time
• Talk 30% of the time
• The one asking questions controls the conversation

WHO YOU ARE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ You are NOT a salesperson
✓ You ARE a financial consultant
✓ You DIAGNOSE problems
✓ You PRESCRIBE solutions
✓ You GUIDE clients to success

THE DISCOVERY FRAMEWORK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SITUATION Questions:
"Tell me about your business."
"How long have you been operating?"
"What's your current financial situation?"

PROBLEM Questions:
"What's your biggest challenge right now?"
"What's keeping you up at night?"
"What have you tried before?"

IMPLICATION Questions:
"What happens if this doesn't get solved?"
"How is this affecting your business?"
"What's the cost of NOT taking action?"

NEED-PAYOFF Questions:
"What would it mean to solve this problem?"
"How would that change things for you?"
"What's your ideal outcome?"`,
        },
        {
          type: "content",
          title: "Buying Signals - Recognize & Act",
          content: `═══════════════════════════════════════════════════════════════
BUYING SIGNALS
RECOGNIZE OPPORTUNITY IN EVERY CONVERSATION
═══════════════════════════════════════════════════════════════

Every conversation contains signals. Learn to recognize them.

LENDING SIGNALS (Apply tag: SVG-LENDING or COOKIN-CAP):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"I own a business but cash flow is tight"
→ Working Capital / MCA

"I need equipment for my business"
→ Equipment Financing

"I have rental properties that need work"
→ Fix & Flip / Bridge Loan

"My business is seasonal and I need flexibility"
→ Line of Credit

"I want to expand but need capital"
→ Term Loan / SBA

"I'm waiting on customers to pay invoices"
→ Invoice Factoring

"I want to buy another property"
→ Real Estate Lending / DSCR

"I want to buy a commercial building"
→ Commercial Real Estate Loan

INVESTMENT SIGNALS (Apply tag: SVG-INVEST):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"I have money sitting in savings doing nothing"
→ 9-12% Fixed Return Fund

"I sold a property and have a large check"
→ 1031 Exchange / UPREIT / Investment

"I'm retired and looking for steady income"
→ Fixed Return Strategies

"My IRA/401k isn't growing"
→ Self-Directed IRA / Alternative Investments

"I want passive income"
→ Lending Syndicate Fund

"I don't trust the stock market"
→ Asset-Backed Investment Options

REAL ESTATE SIGNALS (Apply tag: SVG-RE):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"I'm thinking of selling the house"
→ Wholesaling Opportunity / Listing

"I want to buy investment properties"
→ Acquisition Support / DSCR Loans

"I need to sell fast"
→ Cash Offer / Wholesaling`,
        },
        {
          type: "dialogue",
          title: "Buying Signal Response Scripts",
          speakers: ["Client", "You"],
          lines: [
            {
              speaker: "Client",
              text: "Yeah, I own a small restaurant. Business is good but cash gets tight sometimes waiting on catering payments.",
            },
            {
              speaker: "You",
              text: "I totally understand. A lot of our clients in the restaurant industry deal with that same challenge. How much would having access to quick working capital help your situation?",
            },
            {
              speaker: "Client",
              text: "It would help a lot. I've had to turn down big catering jobs because I couldn't afford to float the costs upfront.",
            },
            {
              speaker: "You",
              text: "That's exactly the kind of situation we help with. We have working capital options that can fund in as little as 24 hours. And since you mentioned waiting on payments - we also have invoice factoring that turns those outstanding invoices into immediate cash. Would either of those be helpful to explore?",
            },
            { speaker: "Client", text: "I didn't know that was possible. What would I need to do?" },
            {
              speaker: "You",
              text: "It's actually very simple. I just need 3 months of your business bank statements and a basic application. Can you gather those documents today?",
            },
          ],
        },
        {
          type: "content",
          title: "The Warm Transfer",
          content: `═══════════════════════════════════════════════════════════════
THE WARM TRANSFER
HANDING OFF WITHOUT DROPPING THE BALL
═══════════════════════════════════════════════════════════════

When you identify a cross-sell opportunity, the WARM TRANSFER is key.

THE PROCESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. GET PERMISSION
"Based on what you've shared, I think you'd really benefit from talking to our lending team. Would you be open to a quick call with them?"

2. SET EXPECTATIONS
"They're going to ask you a few questions about your business and then show you what options might be available. It's no obligation - just an exploratory conversation."

3. MAKE THE INTRODUCTION
"JR, I have [Client Name] on the line. They're currently working with us on [HFCI matter] and mentioned they have a restaurant that needs working capital. They're doing about $45K/month in revenue and need around $75K. I'll let you two take it from here."

4. DOCUMENT EVERYTHING
In GHL notes:
"12/15 - Warm transferred to JR re: working capital. Client has restaurant, $45K/mo revenue, needs $75K. Applied SVG-LENDING tag."

NEVER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Cold transfer without introduction
❌ Send an email and hope they follow up
❌ Forget to document the handoff
❌ Fail to apply the appropriate tags
❌ Make promises about approvals or rates`,
        },
        {
          type: "quiz",
          title: "Sales & Buying Signals Mastery",
          questions: [
            {
              question: "What is the 70/30 rule?",
              options: [
                "70% selling, 30% listening",
                "70% listening, 30% talking",
                "70% email, 30% phone",
                "70% new clients, 30% follow-up",
              ],
              correct: 1,
            },
            {
              question: "When client says 'I own a business but cash flow is tight,' what product fits?",
              options: ["Fix & Flip loan", "Working Capital / MCA", "Investment fund", "Mortgage assistance"],
              correct: 1,
            },
            {
              question: "'I have money sitting in savings doing nothing' signals what?",
              options: [
                "SVG-LENDING opportunity",
                "SVG-INVEST opportunity",
                "COOKIN-CAP opportunity",
                "They need a loan",
              ],
              correct: 1,
            },
            {
              question: "What is the FIRST step in a warm transfer?",
              options: ["Just transfer them", "Get permission from the client", "Send an email", "Hang up"],
              correct: 1,
            },
            {
              question: "'I'm waiting on customers to pay invoices' suggests which product?",
              options: ["Equipment Financing", "Invoice Factoring", "SBA Loan", "Real Estate Loan"],
              correct: 1,
            },
            {
              question: "What should you NEVER do in a warm transfer?",
              options: ["Make an introduction", "Document the handoff", "Cold transfer without context", "Apply tags"],
              correct: 2,
            },
            {
              question: "'I want passive income' signals interest in:",
              options: [
                "Working capital",
                "Lending Syndicate Fund / Investments",
                "Equipment financing",
                "Invoice factoring",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 7: THE LENDER CALL & SCRIPTS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-9",
      title: "The Lender Call & Scripts",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "The 20 Data Points",
          content: `═══════════════════════════════════════════════════════════════
THE LENDER CALL
COLLECTING CRITICAL INFORMATION
═══════════════════════════════════════════════════════════════

Every call must capture these 20 data points:

THE 20 CRITICAL DATA POINTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL INFO:
1. Full legal name
2. Phone number (primary)
3. Email address
4. Best time to reach

PROPERTY INFO (for mortgage clients):
5. Property address
6. Property type (SFR, Condo, Multi)
7. Owner-occupied?
8. Current loan servicer
9. Original loan amount
10. Current balance
11. Monthly payment
12. Interest rate
13. Loan type (FHA, VA, Conv, ARM)

SITUATION INFO:
14. Months behind (if applicable)
15. Hardship type (job loss, medical, divorce)
16. Household income (monthly)
17. Employment status

ADDITIONAL:
18. Other properties owned
19. Bankruptcy history
20. How they heard about us

CROSS-SELL DISCOVERY QUESTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
While on hold or during natural pauses:

"Do you own any other properties?"
→ Signals real estate opportunity

"Do you own a business?"
→ Signals commercial lending opportunity

"Do you have any savings or investments?"
→ Signals investment opportunity

"Are you thinking about buying or selling any property?"
→ Signals RE services opportunity`,
        },
        {
          type: "dialogue",
          title: "Opening Script",
          speakers: ["You", "Client"],
          lines: [
            {
              speaker: "You",
              text: "Good morning/afternoon, thank you for calling Client Services, how may I assist you today?",
            },
            { speaker: "Client", text: "[States their situation]" },
            {
              speaker: "You",
              text: "I understand. I'm here to help. Before we proceed, I need to collect some information to make sure we find the best solution for you. Can I get your full name as it appears on your mortgage statement?",
            },
            { speaker: "Client", text: "[Provides name]" },
            {
              speaker: "You",
              text: "Thank you. And what's the best phone number to reach you? And your email address for documentation purposes?",
            },
            { speaker: "Client", text: "[Provides contact info]" },
            { speaker: "You", text: "Perfect. Now, can you give me the property address we're discussing today?" },
            { speaker: "Client", text: "[Provides address]" },
            { speaker: "You", text: "And who is your current mortgage servicer - who do you make your payments to?" },
          ],
        },
        {
          type: "dialogue",
          title: "Hardship Discovery Script",
          speakers: ["You", "Client"],
          lines: [
            {
              speaker: "You",
              text: "I want to make sure we find the best solution for you. Can you tell me what happened that led to this situation?",
            },
            {
              speaker: "Client",
              text: "I lost my job about 6 months ago. I found a new one but it pays less and I just couldn't catch up.",
            },
            {
              speaker: "You",
              text: "I'm sorry to hear that. It sounds like you've been through a difficult time, but the good news is you're employed now. What's your current monthly household income?",
            },
            { speaker: "Client", text: "About $4,500 now." },
            { speaker: "You", text: "Okay, and how many months behind are you currently?" },
            { speaker: "Client", text: "Three months." },
            {
              speaker: "You",
              text: "Thank you for sharing that. Based on what you've told me, I believe we can help. Let me explain how our process works and what the next steps will be...",
            },
          ],
        },
        {
          type: "quiz",
          title: "Lender Call Mastery",
          questions: [
            {
              question: "How should you open a client services call?",
              options: [
                "Hello?",
                "What do you want?",
                "Thank you for calling Client Services, how may I assist you?",
                "State your business",
              ],
              correct: 2,
            },
            {
              question: "How many critical data points should you collect?",
              options: ["10", "15", "20", "25"],
              correct: 2,
            },
            {
              question: "'Do you own a business?' is a question designed to identify what?",
              options: [
                "Employment status",
                "Commercial lending opportunity",
                "Investment opportunity",
                "Property ownership",
              ],
              correct: 1,
            },
            {
              question: "What should you do while on hold with a lender?",
              options: [
                "Check social media",
                "Ask cross-sell discovery questions",
                "End the call",
                "Put client on hold too",
              ],
              correct: 1,
            },
            {
              question: "When a client shares a hardship, what's the first thing you should do?",
              options: [
                "Immediately pitch a product",
                "Acknowledge their situation with empathy",
                "Transfer them to someone else",
                "Ask about their credit score",
              ],
              correct: 1,
            },
            {
              question: "'Do you have any savings or investments?' identifies what opportunity?",
              options: ["SVG-LENDING", "COOKIN-CAP", "SVG-INVEST", "HFCI"],
              correct: 2,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 8: OBJECTION HANDLING
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-10",
      title: "Objection Handling",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "The 4-Step Framework",
          content: `═══════════════════════════════════════════════════════════════
OBJECTION HANDLING FRAMEWORK
TURN RESISTANCE INTO RESULTS
═══════════════════════════════════════════════════════════════

Objections are not rejections - they're requests for more information.

THE 4-STEP PROCESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ACKNOWLEDGE
   Show you heard them and respect their concern.
   "I completely understand..."
   "That's a valid concern..."
   "I hear what you're saying..."

2. CLARIFY
   Make sure you understand the real objection.
   "Help me understand - what specifically concerns you?"
   "Is it the timing, the cost, or something else?"
   "Can you tell me more about that?"

3. RESPOND
   Address the concern directly.
   Use facts, examples, and testimonials.
   Don't be defensive.

4. CONFIRM
   Check if the concern is resolved.
   "Does that help address your concern?"
   "What other questions do you have?"
   "Are you comfortable moving forward?"`,
        },
        {
          type: "content",
          title: "Common Objections & Responses",
          content: `═══════════════════════════════════════════════════════════════
COMMON OBJECTIONS & RESPONSES
═══════════════════════════════════════════════════════════════

OBJECTION: "I need to think about it"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "I completely understand - this is an important decision. Help me understand what specifically you want to think about. Is it the process, the cost, or something else? I want to make sure you have all the information you need."

OBJECTION: "I can't afford the fees"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "I hear you. Here's how our clients typically look at it - the fee is an investment in protecting your home. What's the cost of NOT taking action? Foreclosure, damaged credit, starting over. We have payment options that can work with your situation. What amount would feel manageable for you?"

OBJECTION: "I've been burned before"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "I'm sorry you went through that - unfortunately there are bad actors in this industry. That's exactly why we do things differently. We're transparent about our process, we communicate at every step, and we have a track record of results. What specifically happened before that concerned you? I want to make sure we address that."

OBJECTION: "Let me talk to my spouse"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "Absolutely - this is a decision you should make together. Would it help if I scheduled a call when you're both available? That way I can answer any questions they might have directly. What time works best for both of you?"

OBJECTION: "I'm just shopping around"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "That's smart - you should compare your options. What criteria are you using to evaluate? I'd like to make sure you're comparing apples to apples. What have you found so far?"

OBJECTION: "The rates are too high"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Response: "I understand rate is important. Let me ask you this - what rate were you expecting? And more importantly, what's the cost of NOT having access to this capital right now? What opportunities are you missing? Sometimes the speed and certainty of funding is worth the premium."`,
        },
        {
          type: "dialogue",
          title: "Objection Handling Practice",
          speakers: ["Client", "You"],
          lines: [
            { speaker: "Client", text: "I don't know... I really need to think about this. It's a big decision." },
            {
              speaker: "You",
              text: "I completely understand. This IS an important decision, and I want you to feel confident about it. Help me understand - is there something specific about the process that you want to think through? Or is it more about timing?",
            },
            { speaker: "Client", text: "I guess I'm just worried about the cost. Money is already tight." },
            {
              speaker: "You",
              text: "That makes total sense. Here's how I'd look at it though - right now you're facing foreclosure, which means losing your home, damaging your credit for 7 years, and having to find a new place to live. Compared to that, the investment in protecting your home is actually much smaller. Plus, we have payment plans that spread the cost out. What if we could do $200/month instead of one lump sum - would that be more manageable?",
            },
            { speaker: "Client", text: "Yeah, that would actually help. I could probably do that." },
            {
              speaker: "You",
              text: "Perfect. Let's set that up then. I'll send over the documents for you to review and sign. Any other concerns before we move forward?",
            },
          ],
        },
        {
          type: "quiz",
          title: "Objection Handling Check",
          questions: [
            {
              question: "What are the 4 steps in the objection handling framework?",
              options: [
                "Argue, Convince, Close, Celebrate",
                "Acknowledge, Clarify, Respond, Confirm",
                "Listen, Ignore, Pitch, Transfer",
                "Question, Answer, Repeat, Hang up",
              ],
              correct: 1,
            },
            {
              question: "When someone says 'I need to think about it,' what should you do first?",
              options: [
                "End the call",
                "Ask what specifically they want to think about",
                "Offer a discount",
                "Call back tomorrow",
              ],
              correct: 1,
            },
            {
              question: "How should you respond to 'I've been burned before'?",
              options: [
                "That's not our problem",
                "Acknowledge, ask what happened, explain how you're different",
                "Ignore it",
                "Hang up",
              ],
              correct: 1,
            },
            {
              question: "What is the purpose of the CONFIRM step?",
              options: [
                "To close the sale",
                "To check if the concern is resolved",
                "To end the conversation",
                "To transfer the call",
              ],
              correct: 1,
            },
            {
              question: "When client says 'Let me talk to my spouse,' what's the best response?",
              options: [
                "Call me back whenever",
                "Offer to schedule a call when both are available",
                "That's just an excuse",
                "Pressure them to decide now",
              ],
              correct: 1,
            },
            {
              question: "Objections are really:",
              options: ["Rejections", "Requests for more information", "Signs to end the call", "Insults"],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 9: HFCI OPERATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-11",
      title: "HFCI Operations & Maintaining the Foundation",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "HFCI - The Foundation",
          content: `═══════════════════════════════════════════════════════════════
HFCI LLC - THE FOUNDATION OF OUR ECOSYSTEM
═══════════════════════════════════════════════════════════════

HFCI is where many clients enter our ecosystem. It remains a critical part of our business even as we expand into lending and investments.

WHAT HFCI DOES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. MORTGAGE ASSISTANCE
   • Loan modification support
   • Forbearance guidance
   • Foreclosure prevention
   • Communication with servicers

2. DOCUMENT PREPARATION
   • Legal documents
   • Financial statements
   • Hardship letters
   • Authorization forms

3. CLIENT ADVOCACY
   • Navigate complex processes
   • Ensure clients understand options
   • Follow up with servicers
   • Track progress and deadlines

THE 200-DAY PROCESS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Days 1-30: Intake & Document Collection
• Gather all required documents
• Complete client profile
• Submit initial package

Days 31-90: Lender Communication
• Contact servicer
• Submit loss mitigation application
• Respond to requests

Days 91-150: Review & Negotiation
• Application under review
• Provide additional documentation
• Advocate for best outcome

Days 151-200: Resolution
• Decision received
• Review terms with client
• Complete process or appeal

WHY HFCI MATTERS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Builds trust with clients over time
• Creates cross-sell opportunities
• Generates referrals
• Establishes us as a full-service solution provider
• Clients stay in ecosystem for future needs`,
        },
        {
          type: "content",
          title: "Growing HFCI While Expanding Services",
          content: `═══════════════════════════════════════════════════════════════
MAINTAINING & GROWING HFCI
WHILE EXPANDING OUR SERVICES
═══════════════════════════════════════════════════════════════

The goal is NOT to replace HFCI - it's to EXPAND what we offer.

HFCI GROWTH STRATEGIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. REFERRAL PROGRAM
   • Happy clients refer friends and family
   • Ask for referrals at key milestones
   • "Who else do you know facing similar challenges?"

2. CROSS-SELL TO EXISTING CLIENTS
   • Every HFCI client is a potential:
     - Lending client (if they own a business)
     - Investment client (if they have capital)
     - Real estate client (if buying/selling)
   • Tag appropriately, warm transfer when ready

3. MARKETING EXPANSION
   • Digital marketing
   • Community outreach
   • Real estate professional partnerships
   • Attorney referral relationships

THE DUAL APPROACH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HFCI CLIENTS → Cross-sell to SVG/CookinCap
LENDING CLIENTS → Cross-sell to SVG-INVEST
INVESTMENT CLIENTS → Referrals to new clients

Everyone who touches our ecosystem can benefit from multiple services.

COOKINCAP.COM - THE COMMERCIAL ARM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CookinCap expands our reach to:
• Business owners needing capital
• Entrepreneurs starting new ventures
• Companies needing equipment
• Businesses with cash flow challenges

This creates a FULL CIRCLE:
• Distressed homeowner comes to HFCI
• Discovers they own a business → CookinCap
• Business thrives, they have capital → SVG-INVEST
• They want to buy property → SVG-RE
• They refer others to HFCI

WE CAN HELP LITERALLY EVERYONE.`,
        },
        {
          type: "quiz",
          title: "HFCI Operations Check",
          questions: [
            {
              question: "What is the typical HFCI process duration?",
              options: ["30 days", "90 days", "200 days", "365 days"],
              correct: 2,
            },
            {
              question: "What are the three main functions of HFCI?",
              options: [
                "Sales, Marketing, Operations",
                "Mortgage Assistance, Document Prep, Client Advocacy",
                "Lending, Investing, Real Estate",
                "Equipment, Working Capital, SBA",
              ],
              correct: 1,
            },
            {
              question: "Why is HFCI important to the overall ecosystem?",
              options: [
                "It's our only service",
                "It builds trust and creates cross-sell opportunities",
                "It's just for show",
                "It doesn't matter",
              ],
              correct: 1,
            },
            {
              question: "What should you do with every HFCI client?",
              options: [
                "Only focus on their mortgage",
                "Look for cross-sell opportunities (lending, investing, RE)",
                "Ignore other needs",
                "Transfer immediately",
              ],
              correct: 1,
            },
            {
              question: "What is the 'dual approach' strategy?",
              options: [
                "Only do HFCI",
                "Cross-sell HFCI clients to other services AND bring lending clients in",
                "Pick one service only",
                "Ignore cross-selling",
              ],
              correct: 1,
            },
            {
              question: "What does 'We can help literally everyone' mean?",
              options: [
                "We only help certain people",
                "Our ecosystem has solutions for any financial need",
                "We help for free",
                "We only help businesses",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // MODULE 10: FINAL CERTIFICATION EXAM
    // ═══════════════════════════════════════════════════════════════════════════
    {
      id: "cc-12",
      title: "Final Certification Exam",
      duration: "30 min",
      sections: [
        {
          type: "content",
          title: "Exam Instructions",
          content: `═══════════════════════════════════════════════════════════════
CRASH COURSE FINAL CERTIFICATION EXAM
═══════════════════════════════════════════════════════════════

Congratulations on completing the Cookin Crash Course!

This final exam will test your knowledge across all modules.

EXAM DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 20 Questions
• All topics covered
• 80% required to pass
• You may retake if needed

TOPICS COVERED:
1. The Saint Vision Ecosystem
2. Pre-Qual Form & GHL Pipeline
3. Loan Products (Working Capital, MCA, Term Loans)
4. Loan Products (SBA, Equipment, LOC, Factoring)
5. Real Estate Financing
6. Sales & Buying Signals
7. The Lender Call & Scripts
8. Objection Handling
9. HFCI Operations

Take your time. Read each question carefully.

Good luck!`,
        },
        {
          type: "quiz",
          title: "Final Certification Exam",
          isFinal: true,
          questions: [
            {
              question: "What are the three pillars of Saint Vision Group?",
              options: [
                "Sales, Marketing, Operations",
                "HFCI, Saint Vision Group, CookinCap",
                "Loans, Investments, Insurance",
                "Real Estate, Mortgages, Credit",
              ],
              correct: 1,
            },
            {
              question: "How quickly should you contact a new lead from the pre-qual form?",
              options: ["Within 24 hours", "Within 5 minutes", "Same week", "When you have time"],
              correct: 1,
            },
            {
              question: "What happens when a pre-qual form is submitted?",
              options: [
                "Nothing",
                "Lead created in GHL + automated welcome email + text",
                "You get an email",
                "It goes to a queue",
              ],
              correct: 1,
            },
            {
              question: "What is the factor rate?",
              options: ["Interest rate", "Multiplier showing total payback amount", "Monthly fee", "Credit score"],
              correct: 1,
            },
            {
              question: "What is the minimum time in business for SBA loans?",
              options: ["6 months", "1 year", "2 years preferred", "5 years"],
              correct: 2,
            },
            {
              question: "What does DSCR stand for?",
              options: [
                "Direct Service Credit Rating",
                "Debt Service Coverage Ratio",
                "Down Service Credit Rate",
                "Debt Score Credit Ratio",
              ],
              correct: 1,
            },
            {
              question: "What is the 70/30 rule in sales?",
              options: [
                "70% selling, 30% listening",
                "70% listening, 30% talking",
                "70% calls, 30% emails",
                "70% new, 30% follow-up",
              ],
              correct: 1,
            },
            {
              question: "'I have money sitting in savings' signals which opportunity?",
              options: ["Lending", "Investment (SVG-INVEST)", "Real estate", "Equipment financing"],
              correct: 1,
            },
            {
              question: "How many data points should you collect on a lender call?",
              options: ["10", "15", "20", "25"],
              correct: 2,
            },
            {
              question: "What is the first step in objection handling?",
              options: ["Argue", "Acknowledge", "Close", "Transfer"],
              correct: 1,
            },
            {
              question: "What is HFCI's typical process duration?",
              options: ["30 days", "90 days", "200 days", "1 year"],
              correct: 2,
            },
            {
              question: "Which product is best for seasonal businesses needing flexibility?",
              options: ["Term Loan", "SBA Loan", "Line of Credit", "Equipment Financing"],
              correct: 2,
            },
            {
              question: "What serves as collateral in equipment financing?",
              options: ["Home", "The equipment", "Inventory", "Nothing"],
              correct: 1,
            },
            {
              question: "How fast can fix & flip loans close?",
              options: ["60-90 days", "30 days", "7-14 days", "6 months"],
              correct: 2,
            },
            {
              question: "What should you do when you identify a buying signal?",
              options: [
                "Ignore it",
                "Document verbatim and apply appropriate tag",
                "Wait until later",
                "Tell your manager",
              ],
              correct: 1,
            },
            {
              question: "What is invoice factoring?",
              options: [
                "Creating invoices",
                "Converting unpaid invoices to immediate cash",
                "Deleting invoices",
                "Sending invoices",
              ],
              correct: 1,
            },
            {
              question: "What is the purpose of cross-platform tags?",
              options: [
                "Organization only",
                "Ensure no opportunity falls through the cracks",
                "Legal compliance",
                "For reports",
              ],
              correct: 1,
            },
            {
              question: "How often should you update clients on pending applications?",
              options: ["Weekly", "Every 48 hours", "Monthly", "When there's news"],
              correct: 1,
            },
            {
              question: "What is a warm transfer?",
              options: [
                "Cold transfer",
                "Introducing client to receiving team with context",
                "Just sending an email",
                "Hanging up",
              ],
              correct: 1,
            },
            {
              question: "What is Saint Vision Group's tagline?",
              options: ["We Get It Done", "The Capital of Capital™", "Finance First", "Your Money Partner"],
              correct: 1,
            },
          ],
        },
      ],
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════════
// ELITE CERTIFICATION - FULL COURSE
// ═══════════════════════════════════════════════════════════════════════════════

export const fullCourseData: Course = {
  id: "full-course",
  title: "Cookin Elite Certification",
  subtitle: "Complete Capital Advisor Training",
  duration: "16 hours",
  icon: "👑",
  color: "from-yellow-500 to-amber-600",
  modules: [
    {
      id: "fc-1",
      title: "Advanced Ecosystem Mastery",
      duration: "90 min",
      sections: [
        {
          type: "content",
          title: "Deep Dive: The Saint Vision Architecture",
          content: `═══════════════════════════════════════════════════════════════
ELITE CERTIFICATION - MODULE 1
ADVANCED ECOSYSTEM MASTERY
═══════════════════════════════════════════════════════════════

Welcome to Elite Certification. This course builds on the Crash Course foundation and takes you to mastery level.

THE ECOSYSTEM ARCHITECTURE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HFCI LLC → SVG (Lending & Investments) → CookinCap (Commercial)

Each division feeds the others:
• HFCI clients become lending clients
• Lending clients become investors
• Investors become referral sources
• Everyone generates new business

THE VALUE PROPOSITION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Single Client Lifetime Value Example:

Year 1: HFCI mortgage assistance ($3,500)
Year 2: Working capital for business ($2,500 fee)
Year 3: Equipment financing ($3,000 fee)
Year 4: Investment into fund ($50,000 deployed)
Year 5: Real estate purchase ($5,000 fee)
Plus: 3 referrals that follow similar path

One client can generate $50,000+ in lifetime value.

THIS is why the ecosystem approach works.`,
        },
        {
          type: "quiz",
          title: "Ecosystem Architecture Check",
          questions: [
            {
              question: "What is the potential lifetime value of a single client in our ecosystem?",
              options: ["$1,000", "$5,000", "$50,000+", "$500"],
              correct: 2,
            },
            {
              question: "How do the three divisions relate to each other?",
              options: [
                "They're completely separate",
                "Each feeds the others - clients flow between divisions",
                "Only HFCI matters",
                "They compete against each other",
              ],
              correct: 1,
            },
          ],
        },
      ],
    },
    {
      id: "fc-2",
      title: "Advanced Lending Products",
      duration: "120 min",
      sections: [
        {
          type: "content",
          title: "Product Selection Framework",
          content: `═══════════════════════════════════════════════════════════════
ADVANCED LENDING - PRODUCT SELECTION
═══════════════════════════════════════════════════════════════

Choosing the right product is an art. Here's how to match clients to products:

DECISION FRAMEWORK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASK: How fast do they need money?
• Same day → MCA
• 1-3 days → Working Capital
• 1-2 weeks → Term Loan / Equipment
• 30-90 days → SBA

ASK: What's their credit like?
• Under 550 → MCA only
• 550-620 → Working Capital, MCA
• 620-680 → Add Equipment, some Term Loans
• 680+ → All products including SBA

ASK: How much do they need?
• $5K-$50K → MCA, Working Capital
• $50K-$250K → All products
• $250K+ → SBA, Term Loan, Commercial RE

ASK: What's it for?
• Cash flow → Working Capital, MCA, LOC
• Equipment → Equipment Financing
• Expansion → Term Loan, SBA
• Real Estate → RE Loans (DSCR, Bridge, etc.)
• Waiting on payments → Invoice Factoring`,
        },
        {
          type: "quiz",
          title: "Product Selection Check",
          questions: [
            {
              question: "Client needs $30K fast, has 580 credit. Best product?",
              options: ["SBA Loan", "MCA or Working Capital", "Equipment Financing", "DSCR Loan"],
              correct: 1,
            },
            {
              question: "Client has 700 credit, needs $500K for expansion, not urgent. Best product?",
              options: ["MCA", "Working Capital", "SBA Loan", "Invoice Factoring"],
              correct: 2,
            },
          ],
        },
      ],
    },
    {
      id: "fc-3",
      title: "Investment Products",
      duration: "90 min",
      sections: [
        {
          type: "content",
          title: "SVG Investment Offerings",
          content: `═══════════════════════════════════════════════════════════════
INVESTMENT PRODUCTS
WHERE CAPITAL GROWS
═══════════════════════════════════════════════════════════════

FIXED RETURN FUND (9-12%):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fixed annual returns
• Monthly or quarterly distributions
• Asset-backed security
• Minimum investment: $25,000
• Ideal for: Retirees, passive income seekers

LENDING SYNDICATE FUND:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Participate in our lending deals
• Diversified loan portfolio
• Higher returns for higher risk tolerance
• Minimum: $50,000

1031 EXCHANGE / UPREIT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tax-deferred real estate exchange
• Trade property into diversified holdings
• Defer capital gains
• Ideal for: Property sellers avoiding taxes`,
        },
        {
          type: "quiz",
          title: "Investment Products Check",
          questions: [
            {
              question: "A retired client wants steady monthly income. Best option?",
              options: ["Lending Syndicate", "Fixed Return Fund", "1031 Exchange", "MCA"],
              correct: 1,
            },
            {
              question: "Client just sold a property for $500K and wants to defer taxes. Best option?",
              options: ["Fixed Return Fund", "Working Capital", "1031 Exchange / UPREIT", "Equipment Financing"],
              correct: 2,
            },
          ],
        },
      ],
    },
    {
      id: "fc-final",
      title: "Elite Certification Final Exam",
      duration: "45 min",
      sections: [
        {
          type: "content",
          title: "Exam Instructions",
          content: `═══════════════════════════════════════════════════════════════
ELITE CERTIFICATION FINAL EXAM
═══════════════════════════════════════════════════════════════

You've completed the Elite Certification course.

EXAM REQUIREMENTS:
• 25 Questions
• 85% required to pass
• Covers all advanced topics

Upon passing, you will be a Certified Cookin Capital Advisor.`,
        },
        {
          type: "quiz",
          title: "Elite Certification Final Exam",
          isFinal: true,
          questions: [
            {
              question: "What is the potential lifetime value of a single ecosystem client?",
              options: ["$1,000", "$10,000", "$50,000+", "$500"],
              correct: 2,
            },
            {
              question: "Client needs money same-day with 550 credit. Best product?",
              options: ["SBA", "MCA", "Term Loan", "Equipment Financing"],
              correct: 1,
            },
            {
              question: "What is the minimum investment for Fixed Return Fund?",
              options: ["$5,000", "$10,000", "$25,000", "$100,000"],
              correct: 2,
            },
            {
              question: "DSCR loans are based on what?",
              options: ["Personal income", "Property cash flow", "Credit score only", "Employment history"],
              correct: 1,
            },
            {
              question: "Fix & flip loans typically close in how many days?",
              options: ["60-90", "30-45", "7-14", "120+"],
              correct: 2,
            },
            {
              question: "What's the purpose of 1031 Exchange?",
              options: ["Get a loan", "Defer capital gains taxes", "Start a business", "Buy equipment"],
              correct: 1,
            },
            {
              question: "Client with 700 credit needs $400K for business expansion. Best product?",
              options: ["MCA", "Working Capital only", "SBA 7(a)", "Invoice Factoring"],
              correct: 2,
            },
            {
              question: "What does ARV stand for?",
              options: ["Annual Return Value", "After Repair Value", "Adjusted Rate Value", "Asset Real Value"],
              correct: 1,
            },
            {
              question: "Invoice factoring advance rate is typically:",
              options: ["50-60%", "80-95%", "100%", "25-30%"],
              correct: 1,
            },
            {
              question: "How should you handle 'I need to think about it'?",
              options: [
                "End the call",
                "Ask what specifically they want to think about",
                "Call back tomorrow",
                "Offer a discount",
              ],
              correct: 1,
            },
            {
              question: "Cross-platform tags ensure what?",
              options: [
                "Pretty reports",
                "No opportunity falls through cracks",
                "Legal compliance",
                "Employee tracking",
              ],
              correct: 1,
            },
            {
              question: "The 70/30 rule means:",
              options: [
                "70% selling, 30% listening",
                "70% listening, 30% talking",
                "70% email, 30% phone",
                "70% new leads, 30% follow-up",
              ],
              correct: 1,
            },
            {
              question: "SBA 7(a) maximum loan amount is:",
              options: ["$1 million", "$2.5 million", "$5 million", "$10 million"],
              correct: 2,
            },
            {
              question: "Equipment financing tax benefit is:",
              options: ["No taxes", "Section 179 deduction", "Tax credit", "Double deduction"],
              correct: 1,
            },
            {
              question: "How quickly contact new leads?",
              options: ["24 hours", "1 hour", "5 minutes", "Same week"],
              correct: 2,
            },
            {
              question: "HFCI process duration is:",
              options: ["30 days", "90 days", "200 days", "1 year"],
              correct: 2,
            },
            {
              question: "A warm transfer requires:",
              options: [
                "Just transferring",
                "Introduction with context to receiving team",
                "Sending an email",
                "Calling back later",
              ],
              correct: 1,
            },
            {
              question: "Line of Credit advantage over Term Loan:",
              options: [
                "Lower rates always",
                "Only pay for what you use, revolving access",
                "Faster funding",
                "No requirements",
              ],
              correct: 1,
            },
            {
              question: "Client says 'I have rental properties needing work.' This signals:",
              options: ["SVG-INVEST", "SVG-LENDING (Fix & Flip/Bridge)", "HFCI only", "Nothing"],
              correct: 1,
            },
            {
              question: "'I want passive income' signals interest in:",
              options: ["Working capital", "Equipment financing", "Investment products (Fund/Syndicate)", "SBA loan"],
              correct: 2,
            },
            {
              question: "What is factor rate 1.40 on $100K total payback?",
              options: ["$100,000", "$104,000", "$140,000", "$114,000"],
              correct: 2,
            },
            {
              question: "DSCR of 1.25 means:",
              options: [
                "Property loses money",
                "NOI is 25% more than debt service",
                "Client has 25% down",
                "Rate is 1.25%",
              ],
              correct: 1,
            },
            {
              question: "Best product for B2B company waiting on customer payments:",
              options: ["MCA", "Invoice Factoring", "SBA", "Equipment Financing"],
              correct: 1,
            },
            {
              question: "Pipeline stage after 'Qualified':",
              options: ["New Lead", "Application Submitted", "Contacted", "Closed"],
              correct: 1,
            },
            {
              question: "Saint Vision Group tagline:",
              options: ["We Get It Done", "Finance First", "The Capital of Capital™", "Your Money Partner"],
              correct: 2,
            },
          ],
        },
      ],
    },
  ],
}

// Export alias for backwards compatibility
export const eliteCertificationData = fullCourseData
