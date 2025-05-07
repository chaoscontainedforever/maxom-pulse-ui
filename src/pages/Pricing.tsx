
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

const Pricing = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include access to our core voice AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Essentials Plan */}
          <Card className="border-2 hover:border-maxom-orange transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Essentials</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">Perfect for small businesses handling low to medium call volumes</p>
              
              <ul className="space-y-3 pt-4">
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Up to 500 calls per month</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Basic call analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Order & reservation management</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Standard voice AI customization</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href="/contact">Get Started</a>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-maxom-orange bg-gradient-to-b from-background to-secondary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-muted-foreground"> pricing</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">For businesses with high call volumes and advanced needs</p>
              
              <ul className="space-y-3 pt-4">
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Unlimited calls</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>24/7 priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Advanced customization options</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCheck className="h-5 w-5 mr-2 text-maxom-orange flex-shrink-0" />
                  <span>API access & integrations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-maxom-violet to-maxom-orange hover:opacity-90" asChild>
                <a href="/contact">Contact Sales</a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
            Our team can build a tailored plan that fits your specific business requirements and call volume needs.
          </p>
          <Button className="btn-outline" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
