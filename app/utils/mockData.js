export const categories = {
  Skincare: {
    subcategories: {
      "Lip Care": ["Lip Scrubs", "Lip Balm", "Lip Mask and Treatment"],
      "Toners & Face Mists": [
        "Toners",
        "Face Mist",
        "Complete Toners & Face Mists Collection",
      ],
      "Facial Kit": ["Facial Kit", "Complete Facial Kit Collection"],
      Moisturizers: [
        "Night Creams",
        "Serums & Essences",
        "Face Moisturizer and Day Cream",
      ],
      "Eye Care": [
        "Eye Masks & Patches",
        "Under eye serums & eye creams",
        "Complete Eye Care Collection",
      ],
      "Specialised Skincare": [
        "Facial Oil",
        "Suppling Tool",
        "Complete Specialised Skincare Collection",
      ],
      Masks: ["Noise Strips", "Complete Stress Collection"],
      "Skin Care Gifts & Value Sets": [
        "Complete Skin Care Gifts & Value Sets Collection",
      ],
    },
    collections: [
      "Complete Lip Care Collection",
      "Complete Aromatherapy Collection",
      "Essential Oils",
      "Carrier Oils",
    ],
  },
  Makeup: {
    subcategories: {
      Face: ["Foundation", "Concealer", "Powder", "Blush", "Bronzer"],
      Eyes: ["Eyeshadow", "Eyeliner", "Mascara", "Eyebrows"],
      Lips: ["Lipstick", "Lip Gloss", "Lip Liner"],
      Cheeks: ["Blush", "Highlighter", "Contour"],
    },
  },
  "Hair Care": {
    subcategories: {
      Shampoo: ["For Dry Hair", "For Oily Hair", "Color Protection"],
      Conditioner: ["Deep Conditioner", "Leave-in Conditioner"],
      Treatment: ["Hair Mask", "Hair Oil", "Serum"],
    },
  },
  "Personal Care": {
    subcategories: {
      "Body Care": ["Body Lotion", "Body Oil", "Body Butter"],
      "Oral Care": ["Toothpaste", "Mouthwash", "Toothbrush"],
    },
  },
  Fragrance: {
    subcategories: {
      Perfume: ["Women", "Men", "Unisex"],
      "Body Mist": ["Floral", "Fruity", "Fresh"],
    },
  },
  "Bath and Body": {
    subcategories: {
      Bath: ["Bath Bombs", "Bath Salts", "Bubble Bath"],
      "Body Wash": ["Shower Gel", "Body Scrub", "Bar Soap"],
    },
  },
};

export const CategoriesDropdown = ({
  showCategoryDropdown,
  isCategory,
  setShowCategoryDropdown,
}) => {
  {
    isCategory && (
      <AnimatePresence>
        {showCategoryDropdown && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0  w-full h-[500px] overflow-y-scroll bg-white rounded-lg shadow-xl border border-gray-200 z-50 "
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <div className="p-6 grid grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">
                  CATEGORIES
                </h3>
                {Object.keys(categories).map((category) => (
                  <div
                    key={category}
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu(category)}
                  >
                    <button className="w-full text-left text-gray-700 hover:text-green-500 font-medium transition-colors py-2 flex justify-between items-center">
                      {category}
                      <IoChevronDown className="w-3 h-3 transform group-hover:rotate-180 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">
                  {activeSubmenu || "Browse"}
                </h3>
                {activeSubmenu && categories[activeSubmenu]?.subcategories && (
                  <div className="space-y-4">
                    {Object.entries(
                      categories[activeSubmenu]?.subcategories
                    )?.map(([subcat, items]) => (
                      <div key={subcat} className="space-y-2">
                        <h4 className="font-medium text-gray-800 text-sm">
                          {subcat}
                        </h4>
                        <div className="space-y-1">
                          {items?.map((item) => (
                            <Link
                              key={item}
                              href={`/category/${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block text-sm text-gray-600 hover:text-green-500 transition-colors"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 text-lg border-b pb-2">
                  Featured
                </h3>
                {activeSubmenu && categories[activeSubmenu]?.collections && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-800 text-sm">
                      Collections
                    </h4>
                    <div className="space-y-2">
                      {categories[activeSubmenu].collections.map(
                        (collection) => (
                          <Link
                            key={collection}
                            href={`/collection/${collection
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                          >
                            {collection}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 text-sm mb-2">
                    Special Offers
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Up to 50% off on selected items
                  </p>
                  <Link
                    href="/offers"
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    View All Offers →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
};
