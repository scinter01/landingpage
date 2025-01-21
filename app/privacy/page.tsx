import { NavBar } from "../../components/nav-bar"
import { Footer } from "../../components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-black via-purple-900/20 to-black">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-black/50 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-purple-300">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-center text-blue-300">Effective Date: January 2025</p>
            <p>
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your
              information when you interact with our landing page to express interest in ScInter.
            </p>

            {[
              {
                title: "1. Information We Collect",
                content: [
                  {
                    subtitle: "a. Personal Information",
                    text: "When you sign up to express interest in ScInter, we collect: Your name and your email address.",
                  },
                  {
                    subtitle: "b. Non-Personal Information",
                    text: "We may also collect: Browser type, device information, and IP address for analytics purposes; Interaction data, such as time spent on the landing page and clicks on elements.",
                  },
                ],
              },
              {
                title: "2. How We Use Your Information",
                content: [
                  { text: "We use the collected data to:" },
                  { text: "- Keep you updated about ScInter's launch and related developments." },
                  { text: "- Respond to inquiries or provide additional information based on your interest." },
                  { text: "- Improve our landing page performance and user experience." },
                ],
              },
              {
                title: "3. Sharing Your Information",
                content: [
                  {
                    text: "Your information will not be sold or shared with third parties, except in the following cases:",
                  },
                  {
                    text: "- Service Providers: To send updates or manage mailing lists (e.g., email marketing tools).",
                  },
                  { text: "- Legal Compliance: To comply with applicable laws or legal obligations." },
                ],
              },
              {
                title: "4. Data Security",
                content: [
                  {
                    text: "We implement reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of electronic transmission or storage is completely secure.",
                  },
                ],
              },
              {
                title: "5. Your Rights",
                content: [
                  { text: "You have the right to:" },
                  { text: "- Request access to or deletion of the personal data you provide." },
                  {
                    text: "- Opt out of receiving updates or promotional emails by using the unsubscribe link in our communications.",
                  },
                ],
              },
              {
                title: "6. Changes to This Policy",
                content: [
                  {
                    text: "This Privacy Policy may be updated periodically. Any changes will be reflected on this page with an updated effective date.",
                  },
                ],
              },
            ].map((section, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-300">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.subtitle && <h3 className="text-xl font-semibold text-blue-300">{item.subtitle}</h3>}
                      <p className="text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            <p className="text-center text-gray-300">
              Thank you for trusting ScInter as we prepare to launch our platform. We are committed to safeguarding your
              privacy as you explore this exciting journey with us.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

