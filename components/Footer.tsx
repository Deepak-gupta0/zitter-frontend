interface FooterItem {
  id: number;
  name: string;
}

const Footer = () => {
  const footerArrayItems: FooterItem[] = [
    { id: 1, name: "Terms and Services" },
    { id: 2, name: "Privacy Policy" },
    { id: 3, name: "Cookie Policy" },
    { id: 4, name: "Accessbility" },
    { id: 5, name: "Ads info" },
    { id: 6, name: "© 2026 Zitter Corp." },
  ];

  return (
    <div className="flex flex-wrap gap-2 text-[11px] text-gray-400 justify-center">
      {footerArrayItems.map((item) => (
        <div key={item.id} className="flex">
          <p >{item.name}</p>
          <div hidden={item.id == 6} className="mx-1">|</div>
        </div>
      ))}
    </div>
  );
};

export default Footer;
