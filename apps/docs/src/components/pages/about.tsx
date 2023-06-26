import Link from 'next/link';

import PageSection from '@/components/page-section';

export default function About() {
  return (
    <PageSection title="About" subtitle="Stuff about the xyflow team">
      <p>
        We are Christopher, Hayleigh, John and Moritz and we work full-time to
        build and maintain React Flow. We are an independent company dedicated
        to creating a stable and maintained open source library that enables you
        to create better node-based UIs. Since 2014, Moritz and Christopher have
        been creating infographics, tools, and projects together through their
        interactive news agency, webkid. Along the way to creating Datablocks in
        2021, they developed React Flow and decided to open-source it. More and
        more people started using it, to the point they decided to work on it
        full-time to create their own open-source project like the many they
        have used and supported themselves. John joined the team in 2022 and
        takes care of the documentation, communication and community at React
        Flow. For any questions or feedback you can{' '}
        <Link href="/contact">contact us</Link>.
      </p>
    </PageSection>
  );
}
