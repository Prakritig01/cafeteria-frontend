import React from "react";

const CounterList = ({ counters, handleCardClick }) => {
  return (
    <div className="counter-list px-4 sm:px-6 lg:px-8 py-8">
      <div className="cards-wrapper max-w-7xl mx-auto">
        {counters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No counters available. Please add some!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {counters.map((counter) => (
              <div
                key={counter._id}
                onClick={() => handleCardClick(counter)}
                className="card relative group h-48 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Image background with overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${counter.image || '/placeholder-image.jpg'})`,
                    backgroundSize: 'cover'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                </div>

                {/* Content overlay */}
                <div className="relative h-full flex flex-col justify-end p-4 text-white">
                  <h2 className="text-xl font-bold mb-1 drop-shadow-md">
                    {counter.name}
                  </h2>
                  <p className="text-sm line-clamp-2 opacity-90">
                    {counter.description || 'No description available'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterList;