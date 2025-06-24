
  import { CiPill } from "react-icons/ci";
  import { MdFactory } from "react-icons/md";
  import { CiCalendar } from "react-icons/ci";
  import { FaFilePrescription } from "react-icons/fa";
  import { CiCircleInfo } from "react-icons/ci";
  import { FaCube } from "react-icons/fa";
  import { FaWallet } from "react-icons/fa";
  import { FaArchive } from "react-icons/fa";
  import { CiMedicalCross } from "react-icons/ci";
  export default function MedicationCard() {
    const medication = {
      name: "Aspirin",
      manufacturer: "Bayer",
      expiryDate: "2025-12-31T00:00:00.000Z",
      dosage: "500mg",
      price: 10.99,
      quantityInStock: 100,
      supplier: "67cfb7b673ffd3a3f2aead44",
      category: "Analgesic",
      description: "Used to relieve pain and reduce fever.",
      dosageForm: "Tablet",
      packSize: 20,
      sideEffects: ["nausea", "stomach pain"],
      prescriptionRequired: false
    };
  
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-indigo-100 rounded-xl">
            <CiPill className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{medication.name}</h1>
          <span className="ml-auto px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
            {medication.category}
          </span>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <MdFactory className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Manufacturer</p>
                <p className="font-medium">{medication.manufacturer}</p>
              </div>
            </div>
  
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <CiCalendar className="h-6 w-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium">
                  {new Date(medication.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Dosage</p>
                <p className="font-medium">{medication.dosage}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Form</p>
                <p className="font-medium">{medication.dosageForm}</p>
              </div>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Pack Size</p>
              <div className="flex items-center gap-2">
                <FaCube className="h-5 w-5 text-gray-500" />
                <span className="text-2xl font-bold text-indigo-600">
                  {medication.packSize}
                </span>
                <span className="text-gray-500">tablets per pack</span>
              </div>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <div className="flex items-center gap-2">
                  <FaWallet className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">${medication.price.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Stock</p>
                <div className="flex items-center gap-2">
                  <FaArchive className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{medication.quantityInStock}</span>
                </div>
              </div>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Prescription Required</p>
              <div className="flex items-center gap-2">
                <FaFilePrescription className="h-6 w-6 text-gray-500" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  medication.prescriptionRequired 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {medication.prescriptionRequired ? 'Required' : 'Not Required'}
                </span>
              </div>
            </div>
  
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <CiMedicalCross className="h-5 w-5" />
                Side Effects
              </p>
              <div className="flex flex-wrap gap-2">
                {medication.sideEffects.map((effect, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-sm"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
          <p className="text-sm text-indigo-600 mb-2 flex items-center gap-2">
            <CiCircleInfo className="h-5 w-5" />
            Description
          </p>
          <p className="text-gray-700 leading-relaxed">{medication.description}</p>
        </div>
      </div>
    );
  }