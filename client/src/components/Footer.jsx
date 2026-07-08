const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 px-6 py-4 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          Job<span className="text-primary font-medium">Tracker</span> ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
