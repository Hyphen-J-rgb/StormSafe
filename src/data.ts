export interface Shelter {
  id: string;
  name: string;
  capacity: number;
  acceptsPets: boolean;
  isSpecialNeeds: boolean;
  isOpen: boolean;
  imageSeed: string;
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  shelterId: string;
  text: string;
  date: string;
}

export interface HazardReport {
  id: string;
  shelterId: string;
  summary: string;
  image: string;
  date: string;
}

export const SHELTERS: Shelter[] = [
  // General Population (No Pets)
  { id: "1", name: "Clearwater Fundamental Middle School", capacity: 1579, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "clearwater", lat: 27.9659, lng: -82.8001 },
  { id: "2", name: "Belleair Elementary School", capacity: 522, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "belleair", lat: 27.9358, lng: -82.7854 },
  { id: "3", name: "Melrose Elementary School", capacity: 900, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "melrose", lat: 27.7675, lng: -82.6648 },
  { id: "4", name: "Campbell Park Elementary School", capacity: 1773, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "campbell", lat: 27.7634, lng: -82.6512 },
  { id: "5", name: "Palm Harbor Middle School", capacity: 1389, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "palm-harbor", lat: 28.0836, lng: -82.7637 },
  { id: "6", name: "New Heights Elementary School", capacity: 2304, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "new-heights", lat: 27.8181, lng: -82.6831 },
  { id: "7", name: "Fairmount Park Elementary School", capacity: 771, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "fairmount", lat: 27.7511, lng: -82.6873 },
  { id: "8", name: "Pizzo Elementary School", capacity: 900, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "pizzo", lat: 28.0617, lng: -82.4131 },
  { id: "9", name: "Reddick Elementary School", capacity: 850, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "reddick", lat: 27.7128, lng: -82.3545 },
  { id: "10", name: "Mulrennan Middle School", capacity: 1400, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "mulrennan", lat: 27.9014, lng: -82.2612 },
  { id: "11", name: "Lockhart Elementary Magnet School", capacity: 900, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "lockhart", lat: 27.9814, lng: -82.4412 },
  { id: "12", name: "Collins PK-8 School", capacity: 1200, acceptsPets: false, isSpecialNeeds: false, isOpen: true, imageSeed: "collins", lat: 27.8547, lng: -82.3214 },

  // General Population (Pet-Friendly)
  { id: "13", name: "Gibbs High School", capacity: 4037, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "gibbs", lat: 27.7747, lng: -82.6812 },
  { id: "14", name: "Palm Harbor University High School", capacity: 1599, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "phuhs", lat: 28.0912, lng: -82.7741 },
  { id: "15", name: "Burnett Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "burnett", lat: 27.9412, lng: -82.3142 },
  { id: "16", name: "Durant High School", capacity: 3000, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "durant", lat: 27.8814, lng: -82.1812 },
  { id: "17", name: "Middleton High School", capacity: 3000, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "middleton", lat: 27.9912, lng: -82.4214 },
  { id: "18", name: "Shields Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "shields", lat: 27.7514, lng: -82.3812 },
  { id: "19", name: "Steinbrenner High School", capacity: 3200, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "steinbrenner", lat: 28.1612, lng: -82.5142 },
  { id: "20", name: "Centennial Middle School", capacity: 1300, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "centennial", lat: 28.2412, lng: -82.1814 },
  { id: "21", name: "Fivay High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "fivay", lat: 28.3412, lng: -82.6814 },
  { id: "22", name: "Wesley Chapel High School", capacity: 3200, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "wesley", lat: 28.2112, lng: -82.3414 },
  { id: "23", name: "River Ridge Middle & High", capacity: 3500, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "river-ridge", lat: 28.2812, lng: -82.6414 },
  { id: "24", name: "Sunlake High School", capacity: 3000, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "sunlake", lat: 28.2312, lng: -82.5114 },
  { id: "25", name: "Atwater Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "atwater", lat: 27.0812, lng: -82.1814 },
  { id: "26", name: "Booker High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "booker", lat: 27.3512, lng: -82.5314 },
  { id: "27", name: "Brookside Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "brookside", lat: 27.3112, lng: -82.5114 },
  { id: "28", name: "Gulf Gate Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "gulf-gate", lat: 27.2612, lng: -82.5114 },
  { id: "29", name: "Heron Creek Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "heron-creek", lat: 27.0912, lng: -82.1914 },
  { id: "30", name: "North Port High School", capacity: 3200, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "north-port", lat: 27.0712, lng: -82.1714 },
  { id: "31", name: "Phillippi Shores Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "phillippi", lat: 27.2812, lng: -82.5314 },
  { id: "32", name: "Southside Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "southside", lat: 27.3212, lng: -82.5314 },
  { id: "33", name: "Woodland Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "woodland", lat: 27.0612, lng: -82.1614 },
  { id: "34", name: "West Hernando Middle School", capacity: 1300, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "west-hernando", lat: 28.5612, lng: -82.5114 },
  { id: "35", name: "Enrichment Center (Brooksville)", capacity: 800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "enrichment", lat: 28.5512, lng: -82.3814 },
  { id: "36", name: "Challenger K-8", capacity: 1200, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "challenger", lat: 28.4812, lng: -82.5314 },
  { id: "37", name: "Auburndale High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "auburndale", lat: 28.0612, lng: -81.7914 },
  { id: "38", name: "Spessard Holland Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "spessard", lat: 27.8912, lng: -81.8414 },
  { id: "39", name: "Citrus Ridge Academy", capacity: 1500, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "citrus", lat: 28.2912, lng: -81.6714 },
  { id: "40", name: "Horizons Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "horizons", lat: 28.2112, lng: -81.6114 },
  { id: "41", name: "George Jenkins High School", capacity: 3200, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "george-jenkins", lat: 27.9612, lng: -81.9414 },
  { id: "42", name: "Highlands Grove Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "highlands", lat: 27.9412, lng: -81.9114 },
  { id: "43", name: "Kathleen High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "kathleen", lat: 28.0912, lng: -81.9814 },
  { id: "44", name: "R. Bruce Wagner Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "bruce-wagner", lat: 27.9812, lng: -82.0114 },
  { id: "45", name: "Sleepy Hill Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "sleepy-hill", lat: 28.0812, lng: -81.9614 },
  { id: "46", name: "Mulberry Middle School", capacity: 1300, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "mulberry", lat: 27.8912, lng: -81.9714 },
  { id: "47", name: "Lake Marion Creek Middle", capacity: 1300, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "lake-marion", lat: 28.1412, lng: -81.5114 },
  { id: "48", name: "Chain of Lakes Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "chain-of-lakes", lat: 27.9912, lng: -81.6914 },
  { id: "49", name: "Winter Haven High School", capacity: 3000, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "winter-haven", lat: 28.0212, lng: -81.7314 },
  { id: "50", name: "Haines City High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "haines-city", lat: 28.1112, lng: -81.6214 },
  { id: "51", name: "Lake Region High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "lake-region", lat: 27.9612, lng: -81.7414 },
  { id: "52", name: "Tenoroc High School", capacity: 2800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "tenoroc", lat: 28.0812, lng: -81.8914 },
  { id: "53", name: "Gullett Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "gullett", lat: 27.4212, lng: -82.4114 },
  { id: "54", name: "Harvey Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "harvey", lat: 27.5612, lng: -82.4814 },
  { id: "55", name: "McNeal Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "mcneal", lat: 27.4312, lng: -82.4314 },
  { id: "56", name: "Miller Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "miller", lat: 27.4912, lng: -82.6314 },
  { id: "57", name: "Mills Elementary School", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "mills", lat: 27.5912, lng: -82.5114 },
  { id: "58", name: "Mona Jain Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "mona-jain", lat: 27.4112, lng: -82.4214 },
  { id: "59", name: "Myakka Elementary School", capacity: 800, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "myakka", lat: 27.3512, lng: -82.2314 },
  { id: "60", name: "Sugg Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "sugg", lat: 27.4812, lng: -82.5814 },
  { id: "61", name: "Robert H. Prine Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "robert-prine", lat: 27.4512, lng: -82.5614 },
  { id: "62", name: "Virgil Mills Elementary", capacity: 900, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "virgil-mills", lat: 27.5812, lng: -82.4914 },
  { id: "63", name: "Buffalo Creek Middle School", capacity: 1400, acceptsPets: true, isSpecialNeeds: false, isOpen: true, imageSeed: "buffalo-creek", lat: 27.5912, lng: -82.4414 },

  // Special Needs Shelters
  { id: "64", name: "Dunedin Highland Middle School", capacity: 1996, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "dunedin", lat: 28.0112, lng: -82.7714 },
  { id: "65", name: "Oak Grove Middle School", capacity: 1984, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "oak-grove", lat: 27.9312, lng: -82.7414 },
  { id: "66", name: "Sumner High School", capacity: 3200, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "sumner", lat: 27.7912, lng: -82.3114 },
  { id: "67", name: "Strawberry Crest High School", capacity: 3000, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "strawberry", lat: 28.0212, lng: -82.2114 },
  { id: "68", name: "Fasano Regional Hurricane Center", capacity: 1000, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "fasano", lat: 28.3112, lng: -82.6914 },
  { id: "69", name: "FDOH Polk Specialty Care Unit", capacity: 500, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "fdoh", lat: 27.9412, lng: -81.8114 },
  { id: "70", name: "Ridge Community High School", capacity: 2800, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "ridge", lat: 28.1912, lng: -81.6314 },
  { id: "71", name: "McKeel Academy", capacity: 1200, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "mckeel", lat: 28.0412, lng: -82.0114 },
  { id: "72", name: "City Furniture (Plant City)", capacity: 1500, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "city-furniture", lat: 28.0112, lng: -82.1114 },
  { id: "73", name: "Seminole Hard Rock Casino", capacity: 5000, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "hard-rock", lat: 27.9912, lng: -82.3714 },
  { id: "74", name: "BayCare (old Barnes & Noble)", capacity: 600, acceptsPets: false, isSpecialNeeds: true, isOpen: true, imageSeed: "baycare", lat: 28.0112, lng: -82.7314 },
];
