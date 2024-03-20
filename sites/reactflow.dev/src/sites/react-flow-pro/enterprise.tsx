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
  Accordion,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Enterprise() {
  const [formData, setFormData] = useState({
    plan: 'starter',
    email: undefined,
    name: undefined,
    website: undefined,
    same_end_user: true,
    end_user_name: undefined,
    end_user_website: undefined,
    message: undefined,
  });

  const onSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      try {
        console.log(formData);
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
    [formData],
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
        <Accordion
          defaultValue={[
            'subscription-plan',
            'contact-details',
            'end-user-details',
          ]}
          type="multiple"
        >
          <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
            <InputLabel>Subscription Plan</InputLabel>
            <div className="grid grid-cols-3 gap-x-2">
              <Button
                type="button"
                className={
                  formData.plan === 'starter'
                    ? 'hover:bg-white cursor-default'
                    : 'hover:bg-gray-100'
                }
                variant={formData.plan === 'starter' ? 'outline' : 'ghost'}
                onClick={() =>
                  setFormData((fd) => ({ ...fd, plan: 'starter' }))
                }
              >
                Starter
              </Button>
              <Button
                type="button"
                className={
                  formData.plan === 'pro'
                    ? 'hover:bg-white cursor-default'
                    : 'hover:bg-gray-100'
                }
                variant={formData.plan === 'pro' ? 'outline' : 'ghost'}
                onClick={() => setFormData((fd) => ({ ...fd, plan: 'pro' }))}
              >
                Professional
              </Button>
              <Button
                type="button"
                className={
                  formData.plan === 'enterprise'
                    ? 'hover:bg-white cursor-default'
                    : 'hover:bg-gray-100'
                }
                variant={formData.plan === 'enterprise' ? 'outline' : 'ghost'}
                onClick={() =>
                  setFormData((fd) => ({ ...fd, plan: 'enterprise' }))
                }
              >
                Enterprise
              </Button>
            </div>
            <InputLabel>Contact Email</InputLabel>
            <Input
              name="email"
              type="email"
              required
              placeholder="info@xyflow.com"
              value={formData.email}
              onChange={(evt) =>
                setFormData((fd) => ({ ...fd, email: evt.target.value }))
              }
            />
            <InputLabel>Company Name</InputLabel>
            <Input
              name="name"
              type="text"
              placeholder="ACME Inc."
              value={formData.name}
              onChange={(evt) =>
                setFormData((fd) => ({ ...fd, name: evt.target.value }))
              }
            />
            <InputLabel>Company Website</InputLabel>
            <Input
              placeholder="https://..."
              name="company"
              type="url"
              required
              value={formData.website}
              onChange={(evt) =>
                setFormData((fd) => ({ ...fd, website: evt.target.value }))
              }
            />
            <div className="flex flex-col gap-y-2">
              <InputLabel className="flex gap-2 items-center font-normal">
                <Checkbox
                  checked={formData.same_end_user}
                  onCheckedChange={(same_end_user) =>
                    setFormData((fd) => ({
                      ...fd,
                      same_end_user: !!same_end_user,
                    }))
                  }
                />
                <span>End User is the same company</span>
              </InputLabel>
              {!formData.same_end_user && (
                <>
                  <InputLabel>End User Company Name</InputLabel>
                  <Input
                    required
                    name="name"
                    type="text"
                    placeholder="ACME Inc."
                  />
                  <InputLabel>End User Company Website</InputLabel>
                  <Input
                    placeholder="https://..."
                    name="company"
                    type="url"
                    required
                  />
                </>
              )}
            </div>
            <InputLabel>Send us a message</InputLabel>
            <textarea
              name="message"
              placeholder="Your message..."
              // These classes are copied from the `<Input />` component.
              className="px-4 py-2 border border-gray-300 rounded-lg w-full resize-none"
              rows={5}
            />
            <InputLabel className="flex gap-2 items-center font-normal my-6">
              <Checkbox required />
              <div>
                <div>Agree to Terms and Conditions</div>
              </div>
            </InputLabel>
            <Button
              className="!bg-primary hover:!bg-primary/90"
              type="submit"
              role="submit"
            >
              Request a quote
            </Button>
          </form>
        </Accordion>
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
      <SelectTrigger>
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
