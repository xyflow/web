import { useCallback, useState } from 'react';
import {
  Card,
  InputLabel,
  Input,
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Checkbox,
  CardContent,
  CardHeader,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Enterprise() {
  const [plan, setPlan] = useState('starter');
  const [billingCountry, setBillingCountry] = useState(undefined);
  const [shippingCountry, setShippingCountry] = useState(null);
  const [isSameEndUser, setIsSameEndUser] = useState(true);

  const onSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const formData = new FormData(evt.currentTarget);
      // @ts-ignore
      const data = Object.fromEntries(formData.entries());

      try {
        console.log(data);
        // const response = await fetch(
        //   process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string,
        //   {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Accept: 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   },
        // );
      } catch (err) {}
    },
    [],
  );

  return (
    <BaseLayout>
      <Hero
        kicker="React Flow Pro"
        title="Request a Quote"
        subtitle="Use the form below to get an official quote for one of our subscription plans."
        kickerIcon={SparklesIcon}
        align="center"
        showGradient
      />
      <Card className="p-8 bg-white relative max-w-xl mx-auto mt-16">
        <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
          <InputLabel>
            <span>Select a subscription plan</span>
            <div className="grid grid-cols-3 gap-x-2">
              <Card>
                <CardHeader>Starter</CardHeader>
              </Card>
              <Card className="bg-primary">
                <CardHeader>Professional</CardHeader>
              </Card>
              <Card>
                <CardHeader>Enterprise</CardHeader>
              </Card>
            </div>
          </InputLabel>

          <InputLabel>
            <span>Contact Email</span>
            <Input
              name="email"
              type="email"
              required
              variant="square"
              placeholder="Your work email..."
            />
          </InputLabel>

          <InputLabel>
            <span>Company Website</span>
            <Input
              placeholder="https://..."
              name="company"
              type="url"
              required
              variant="square"
            />
          </InputLabel>

          <InputLabel>
            <span>Billing Details</span>
            <div className="flex flex-col gap-y-2">
              <Input
                name="name"
                type="text"
                variant="square"
                placeholder="ACME Inc."
              />
              <CountrySelect
                value={billingCountry}
                onValueChange={(value) => setBillingCountry(value)}
              />
              {billingCountry && (
                <>
                  <InputLabel>
                    <span>Address (optional)</span>
                    <div className="flex flex-col gap-y-2">
                      <Input
                        name="line1"
                        type="text"
                        variant="square"
                        placeholder="Adress Line 1"
                      />
                      <Input
                        name="line2"
                        type="text"
                        variant="square"
                        placeholder="Adress Line 2"
                      />
                      <Input
                        name="postal_code"
                        type="text"
                        variant="square"
                        placeholder="ZIP or postal code"
                      />
                      <Input
                        name="city"
                        type="text"
                        variant="square"
                        placeholder="City, district, suburb, town, or village"
                      />
                      <Input
                        name="state"
                        type="text"
                        variant="square"
                        placeholder="State, county, province, or region"
                      />
                    </div>
                  </InputLabel>
                </>
              )}
            </div>
          </InputLabel>

          <InputLabel>
            <span>End User Details</span>
          </InputLabel>

          <InputLabel className="flex gap-2 items-center font-normal">
            <Checkbox
              checked={isSameEndUser}
              onCheckedChange={(checked) => setIsSameEndUser(!!checked)}
            />
            <span>Same as Billing Details</span>
          </InputLabel>
          <InputLabel className="col-span-4">
            <span>Additional Information</span>
            {/* Maybe we should wrap this in a component and drop it into xy-ui/TextArea
                  or something similar. */}
            <textarea
              name="message"
              placeholder="Your message..."
              // These classes are copied from the `<Input />` component.
              className="px-4 py-2 border border-gray-300 rounded-lg w-full resize-none"
              rows={5}
            />
          </InputLabel>
          <InputLabel className="flex gap-2 items-center font-normal">
            <Checkbox required />
            <span>Agree to Terms and Conditions</span>
          </InputLabel>
          <Button
            className="!bg-primary hover:!bg-primary/90"
            type="submit"
            role="submit"
          >
            Request a quote
          </Button>
        </form>
      </Card>
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}

const countries = [
  { country: 'Australia', code: 'AU' },
  { country: 'Austria', code: 'AT' },
  { country: 'Belgium', code: 'BE' },
  { country: 'Brazil', code: 'BR' },
  { country: 'Bulgaria', code: 'BG' },
  { country: 'Canada', code: 'CA' },
  { country: 'Croatia', code: 'HR' },
  { country: 'Cyprus', code: 'CY' },
  { country: 'Czech Republic', code: 'CZ' },
  { country: 'Denmark', code: 'DK' },
  { country: 'Estonia', code: 'EE' },
  { country: 'Finland', code: 'FI' },
  { country: 'France', code: 'FR' },
  { country: 'Germany', code: 'DE' },
  { country: 'Gibraltar', code: 'GI' },
  { country: 'Greece', code: 'GR' },
  { country: 'Hong Kong', code: 'HK' },
  { country: 'Hungary', code: 'HU' },
  { country: 'India', code: 'IN' },
  { country: 'Indonesia', code: 'ID' },
  { country: 'Ireland', code: 'IE' },
  { country: 'Italy', code: 'IT' },
  { country: 'Japan', code: 'JP' },
  { country: 'Latvia', code: 'LV' },
  { country: 'Liechtenstein', code: 'LI' },
  { country: 'Lithuania', code: 'LT' },
  { country: 'Luxembourg', code: 'LU' },
  { country: 'Malaysia', code: 'MY' },
  { country: 'Malta', code: 'MT' },
  { country: 'Mexico ', code: 'MX' },
  { country: 'Netherlands', code: 'NL' },
  { country: 'New Zealand', code: 'NZ' },
  { country: 'Norway', code: 'NO' },
  { country: 'Poland', code: 'PL' },
  { country: 'Portugal', code: 'PT' },
  { country: 'Romania', code: 'RO' },
  { country: 'Singapore', code: 'SG' },
  { country: 'Slovakia', code: 'SK' },
  { country: 'Slovenia', code: 'SI' },
  { country: 'Spain', code: 'ES' },
  { country: 'Sweden', code: 'SE' },
  { country: 'Switzerland', code: 'CH' },
  { country: 'Thailand', code: 'TH' },
  { country: 'United Arab Emirates', code: 'AE' },
  { country: 'United Kingdom', code: 'GB' },
  { country: 'United States', code: 'US' },
];

function CountrySelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="rounded-lg">
        <SelectValue placeholder="Select a country..." />
      </SelectTrigger>
      <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
        {countries.map((country) => (
          <SelectItem value={country.code}>{country.country}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
