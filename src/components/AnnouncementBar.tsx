export default function AnnouncementBar() {
    return (
      <div className="bg-gradient-to-r w-screen from-[#1a1a1a] to-[#282828] text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span role="img" aria-label="rocket" className="text-base">
                🚀
              </span>
              Welcome to the beta launch of mAfi!
            </span>
          </div>
        </div>
      </div>
    );
  }