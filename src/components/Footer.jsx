const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white py-6 sm:mt-16 sm:py-8">
      <div className="mx-auto max-w-7xl px-3 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
          Built by @lynnthelight | Powered by Circle CCTP & Base
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:gap-4 sm:text-sm">
          <a
            href="https://base.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors active:text-gray-900 sm:hover:text-gray-900 sm:hover:underline"
          >
            About Base
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://developers.circle.com/stablecoins/docs/cctp-getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors active:text-gray-900 sm:hover:text-gray-900 sm:hover:underline"
          >
            CCTP Docs
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://twitter.com/lynnthelight"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors active:text-gray-900 sm:hover:text-gray-900 sm:hover:underline"
          >
            @lynnthelight
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://github.com/frombarmars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors active:text-gray-900 sm:hover:text-gray-900 sm:hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;