export default function About() {
  return (
    <div className="flex flex-col">
      <section className="bg-secondary  py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
        </div>
      </section>
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Data Collection</h2>
            <p className="mt-4 text-muted-foreground leading-8">
              We collect personal information that you provide when you create
              an account, place an order, or contact us. This information may
              include your name. In addition, we also automatically collect
              certain information when you access our website, such as your IP
              address and browser type.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Purpose of Use</h2>
            <p className=" text-muted-foreground leading-8">
              We use your personal information for the following purposes:
            </p>
            <ul className="space-y-4 text-muted-foreground leading-8">
              <li>
                To process your orders: We use your contact and payment
                information to confirm and process orders, as well as to send
                invoices and shipping information.
              </li>
              <li>
                To provide customer service: We use your contact information to
                respond to inquiries, resolve issues, and provide technical
                support.
              </li>
              <li>
                To send marketing information: With your consent, we may use
                your email address to send information about new products,
                services, promotions, and special events.
              </li>
              <li>
                To improve our services: We use aggregated and anonymized data
                to analyze trends and improve our services.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
