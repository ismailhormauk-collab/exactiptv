export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    category: "General",
    question: "What is IPTV and how does it work?",
    answer: "IPTV (Internet Protocol Television) delivers TV channels and content through your internet connection instead of traditional cable or satellite. You get access to 50,000+ live channels, movies, and series streamed directly to your device in HD and 4K quality."
  },
  {
    category: "General",
    question: "How quickly can I start watching after subscribing?",
    answer: "Activation is near-instant! After your payment is confirmed, you'll receive your login credentials via WhatsApp within minutes. Most customers are streaming within 10 minutes of subscribing."
  },
  {
    category: "General",
    question: "Is there a free trial available?",
    answer: "Contact us on WhatsApp at +44 7380 310123 to ask about current trial options. We occasionally offer short trials for new customers to experience the service quality."
  },
  {
    category: "Pricing",
    question: "What pricing plans do you offer?",
    answer: "We offer flexible plans: 1 Month (€20), 3 Months (€35), 6 Months (€45), and 12 Months (€65). The 12-month plan offers the best value at just €5.42/month — saving you over 73% compared to the monthly rate."
  },
  {
    category: "Pricing",
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods. Contact us on WhatsApp (+44 7380 310123) for current payment options and to complete your order securely."
  },
  {
    category: "Pricing",
    question: "Do you offer refunds?",
    answer: "We're confident in our service quality and encourage you to start with a 1-month plan to test. Contact our support team via WhatsApp if you experience any issues — we'll work to resolve them first."
  },
  {
    category: "Devices",
    question: "Which devices are compatible with your IPTV service?",
    answer: "Our IPTV service works on virtually all modern devices: Amazon Firestick, Android phones & tablets, iPhones & iPads, Smart TVs (Samsung, LG, Sony), Apple TV, Android TV boxes, Windows PCs, and Macs. If your device has internet access, it can likely run IPTV."
  },
  {
    category: "Devices",
    question: "Which is the best device for IPTV streaming?",
    answer: "For the best IPTV experience, we recommend the Amazon Fire TV Stick 4K Max. It's affordable (~£50), supports 4K HDR, and works with all the best IPTV apps including TiviMate and IPTV Smarters Pro."
  },
  {
    category: "Devices",
    question: "How many devices can I use simultaneously?",
    answer: "Our subscriptions support multiple simultaneous connections. Contact us on WhatsApp for details about connection limits for each plan and to choose the right plan for your household."
  },
  {
    category: "Technical",
    question: "What internet speed do I need for IPTV?",
    answer: "For smooth streaming, we recommend: 10 Mbps for HD (1080p) streaming, and 25 Mbps for 4K Ultra HD streaming. Most modern broadband connections in the UK easily meet these requirements."
  },
  {
    category: "Technical",
    question: "Why is my IPTV buffering?",
    answer: "Buffering is usually caused by a slow internet connection, weak Wi-Fi signal, or ISP throttling. Solutions: use a wired ethernet connection, increase buffer size in your IPTV app settings, use a VPN to bypass ISP throttling, or contact our 24/7 support on WhatsApp for server-side assistance."
  },
  {
    category: "Technical",
    question: "Which IPTV app should I use?",
    answer: "For Firestick and Android TV: TiviMate (best experience) or IPTV Smarters Pro. For Android phones/tablets: IPTV Smarters Pro or OTT Navigator. For iPhone/iPad: GSE Smart IPTV. For Smart TV: IPTV Smarters Pro or device-specific apps. All these apps are free to download."
  },
  {
    category: "Content",
    question: "How many channels do you offer?",
    answer: "Our subscription includes 50,000+ live channels covering sports, entertainment, news, movies, kids, and international content from 50+ countries. Additionally, you get access to 100,000+ on-demand movies and TV series."
  },
  {
    category: "Content",
    question: "Do you have sports channels like Sky Sports and BT Sport?",
    answer: "Yes! We include the complete Sky Sports package (all 9 channels), BT Sport/TNT Sports, beIN Sports, Eurosport, ESPN, and over 1,000 dedicated sports channels covering football, basketball, boxing, Formula 1, tennis, golf, and more."
  },
  {
    category: "Content",
    question: "Is 4K content available?",
    answer: "Yes! Our subscription includes hundreds of 4K Ultra HD channels and 4K VOD content. A 4K-capable device and a 25 Mbps+ internet connection are required for 4K streaming."
  },
  {
    category: "Content",
    question: "Do you have an electronic program guide (EPG)?",
    answer: "Yes! Our service includes a comprehensive Electronic Program Guide (EPG) for most channels, showing current and upcoming programs for the next 7 days. EPG is supported in all major IPTV apps."
  },
  {
    category: "Support",
    question: "How do I contact customer support?",
    answer: "Our support team is available 24/7 via WhatsApp at +44 7380 310123. We typically respond within 15 minutes and can help with setup, technical issues, billing questions, and anything else you need."
  },
  {
    category: "Support",
    question: "Can you help me set up IPTV on my device?",
    answer: "Absolutely! Our support team provides step-by-step setup assistance for any device via WhatsApp. Whether you're setting up on Firestick, Smart TV, phone, or PC, we'll guide you through every step."
  },
  {
    category: "Support",
    question: "What happens if a channel stops working?",
    answer: "Contact us on WhatsApp immediately. Our technical team monitors channel performance 24/7 and typically resolves issues within minutes to hours. Most channels have backup streams that we can switch you to instantly."
  }
];

export const faqCategories = Array.from(new Set(faqItems.map(item => item.category)));
