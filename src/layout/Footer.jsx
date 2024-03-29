import Link from 'next/link';

const footerSections = [
  {
    title: "Info",
    links: [
      { title: "Terms of Use", href: "#" },
      { title: "Revision Policy", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Cookies Policy", href: "#" },
      { title: "Disclaimer", href: "#" },
      { title: "Money Back Guarantee", href: "#" },
      { title: "Quality Evaluation Policy", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { title: "Essay Writer", href: "#" },
      { title: "Cheap College Essays", href: "#" },
      { title: "Discussion Essay", href: "#" },
      { title: "Rewrite My Essay", href: "#" },
      { title: "Buy Persuasive Essay", href: "#" },
      { title: "Term Papers for Sale", href: "#" },
      { title: "Buy Argumentative Essay", href: "#" },
      { title: "Buy Critical Essay", href: "#" },
      { title: "Buy Narrative Essay", href: "#" },
      { title: "Research Papers For Sale", href: "#" },
      { title: "Literature Review Writing", href: "#" },
    ],
  },
];

export default function Footer() {
  return ( 
      <footer className="bg-gray-200 text-gray-700 py-8">
        <div className="container mx-auto flex flex-wrap justify-center">
          {footerSections.map((section, index) => (
            <div key={index} className="w-full md:w-1/4 lg:w-1/6 mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-blue-500 hover:text-gray-100 transition duration-300">{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
  )
}