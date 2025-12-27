import React from 'react';

interface LinkItem {
  name: string;
  label: string;
  url: string;
}

const SocialLinks: React.FC = () => {
  const links: LinkItem[] = [
    { name: 'discord', url: 'https://discord.com/users/1196103909916299354', label: 'Discord Profile' },
    { name: 'github', url: 'https://github.com/vanillacc', label: 'GitHub Profile' },
    { name: 'mail', url: 'mailto:uereverse@outlook.com', label: 'Mail Contact' },
  ];

  return (
    <div className="group flex items-center justify-center gap-x-4 text-xs font-medium tracking-wide select-none">
      {links.map((link, index) => (
        <React.Fragment key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-[#888] transition-all duration-300 cursor-pointer no-underline
              group-hover:text-[#444] hover:!text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          >
            {link.name}
          </a>
          
          {}
          {index < links.length - 1 && (
            <span className="text-[#262626] transition-colors duration-300 group-hover:text-[#1a1a1a]" aria-hidden="true">
              //
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SocialLinks;
