import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/app/MainLayout';

// Define component props (if any data is passed later)
// interface AboutIndexProps {}

export default function Index(/* props: AboutIndexProps */) {
    return (
        <MainLayout>
            <div>
                <Head title="About Us" />
                <h1>About the TV Channel</h1>

            <section>
                <h2>Our Mission</h2>
                <p>
                    [Placeholder for the description of the TV channel.]
                </p>
            </section>

            {/* Team section will be added later */}
            {/* <section>
                <h2>Our Team</h2>
                <p>[Placeholder for team information]</p>
            </section> */}

            {/* Contacts section will be added later */}
            {/* <section>
                <h2>Contact Us</h2>
                <p>[Placeholder for contact details]</p>
            </section> */}
        </div>
        </MainLayout>
    );
} 