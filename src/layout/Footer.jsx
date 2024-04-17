'use client'
import { Messages } from '@/helpers';
import { useFetchResourceOne } from '@/hooks';
import { IconFacebook, IconTwitter } from '@/icons';
import Link from 'next/link';

export default function Footer() {
  const { data: dataFetchedCompany } = useFetchResourceOne('companies');
  return ( 
    <footer className="bg-gray-900 text-white py-8">
      {dataFetchedCompany.error && <Messages>{dataFetchedCompany.error}</Messages>}
      {dataFetchedCompany?.data && (
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">
              {dataFetchedCompany.data.companyname}
            </h3>
            <p>Email: {dataFetchedCompany.data.companyemail}</p>
            <p>Phone: {dataFetchedCompany.data.companyphone}</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul>
              <li><Link href={`/page/about-us`}>About Us</Link></li>
              <li><Link href={`/page/our-services`}>Services</Link></li>
              <li><Link href={`/page/faq`}>FAQ</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li><Link href={`/page/privacy-policy`}>Privacy Policy</Link></li>
              <li><Link href={`/page/terms-of-service`}>Terms of Service</Link></li>
              <li><Link href={`/page/disclaimer`}>Disclaimer</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href={`${dataFetchedCompany.data.companytwitterlink}`} className="text-blue-400 hover:text-blue-200 transition duration-300">
                <IconTwitter title="Follow us on Twitter" />
              </Link>
              <Link href={`${dataFetchedCompany.data.companyfacebooklink}`} className="text-blue-400 hover:text-blue-200 transition duration-300">
                <IconFacebook title="Follow us on Facebook" />
              </Link>
            </div>
          </div>
        </div>
      )}
      {dataFetchedCompany?.data && (
        <div className="border-t border-gray-800 mt-8 pt-4 text-center">
          <p>&copy; 2024 {dataFetchedCompany.data.companyname}. All rights reserved.</p>
        </div>
      )}
    </footer>
  )
}