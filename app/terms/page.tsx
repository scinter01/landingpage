import { NavBar } from "../../components/nav-bar"
import { Footer } from "../../components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-black via-purple-900/20 to-black">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-black/50 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-purple-300">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-center text-blue-300">Effective Date: January 2025</p>
            <p>
              Welcome to ScInter! We, scinter.pvt.ltd. is a registered business entity in Canberra, Australia with ABN :
              88674896756.
            </p>
            <p>
              By signing up for our waitlist, you agree to the following Terms of Service. Please read these terms
              carefully. If you do not agree with these terms, do not proceed with signing up.
            </p>

            {[
              {
                title: "1. Purpose of the Waitlist",
                content:
                  "The ScInter waitlist allows users to register their interest in our platform before its official launch. Joining the waitlist does not guarantee access to ScInter services or features, as access may be provided on a priority basis or at ScInter's discretion.",
              },
              {
                title: "2. Information We Collect",
                content:
                  "To join the waitlist, we collect the following information: Personal Information (Your name, email address, and any additional details you provide) and Usage Information (Optional survey responses or preferences you choose to share). For more information on how we handle your data, please review our Privacy Policy.",
              },
              {
                title: "3. How We Use Your Information",
                content:
                  "Your information will only be used to: Notify you about ScInter updates, including launch dates and platform news; Offer you early access opportunities and exclusive insights about ScInter; Understand user preferences to improve the platform.",
              },
              {
                title: "4. User Responsibilities",
                content:
                  "By joining the ScInter waitlist, you agree to: Provide accurate and truthful information during sign-up; Use any early access privileges or communications responsibly; Avoid attempting to misuse or disrupt any communications or systems related to the waitlist.",
              },
              {
                title: "5. Modifications to the Waitlist",
                content:
                  "ScInter reserves the right to: Modify or discontinue the waitlist at any time without prior notice; Prioritize access based on internal criteria (e.g., engagement levels, target audience); Contact waitlist users with marketing or promotional materials related to ScInter.",
              },
              {
                title: "6. Limitation of Liability",
                content:
                  "By signing up, you acknowledge that: ScInter provides the waitlist 'as is' without warranties of any kind; ScInter is not responsible for delays, interruptions, or errors in communications related to the waitlist; Participation in the waitlist does not create a contractual obligation for ScInter to grant platform access.",
              },
              {
                title: "7. Changes to These Terms",
                content:
                  "ScInter reserves the right to update these Terms of Service. Any changes will be communicated to you via email or posted on the website. Continued participation in the waitlist constitutes acceptance of the revised terms.",
              },
            ].map((section, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-300">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}

