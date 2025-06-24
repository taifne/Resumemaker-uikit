'use client';
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import Table, { Column } from '../../components/table';
import { Loading } from '../../components/Loading';
import { useCreateOrderDetail, useDeleteOrderDetail, useOrderDetail } from '../../hooks/useOrderDetailMutation';
import { CreateOrderItemDto, OrderDetail } from '../../type/order-detail.type';
import { useOrder, useOrderDetailsByOrderKey } from '../../hooks/useOrderMutation';
import Button from '../../components/Button';
import { Popup } from '../../components/Popup';
import { Toast } from '../../components/Toast';
import { CustomSelect } from '../../components/Select';
import { useAllMedicines } from '../../hooks/useLazyMedicines';
import { IoIosRemoveCircle } from "react-icons/io";
const OrderDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const orderKey = searchParams.get('orderKey')??"";
   const [showToast, setShowToast] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const {
        data: medicinesList,
        isLoading: isMedicineLoading,
        isError: isMedicineError,
        error,
      } = useAllMedicines();
      const options =
      medicinesList?.map((r) => ({
        label: r.name,
        value: r._id,
      })) || [];
  const { data: orderdetail, isLoading:orderdetailLoading ,refetch:refethDetail } = useOrderDetailsByOrderKey(orderKey); // Assumes a query like useQuery(['order', orderKey], ...)
 const { mutate: deleteOrderDetail } = useDeleteOrderDetail();

const handleRemove = (orderKey: string, orderDetailId: string) => {
  deleteOrderDetail({ orderKey, orderDetailId });
};
  const [orderDetailId, setOrderDetailId] = useState<string>('');
  const [medicine, setMedicine] = useState<string>('');
  const [maxQuantiy, setMaxQuantiy] =useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [errorObject, setErrorObject] = useState<any>({});
    const [message, setMessage] = useState("");
  const { mutate: CreateOrderDetail } = useCreateOrderDetail();
  const { data: order, isLoading,refetch } = useOrder(orderKey);
     const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
   const handleRemoveMedicine = () => {
  deleteOrderDetail({ orderKey, orderDetailId }, {
    onSuccess: () => {
      refetch(); // <- Call search after deletion
      refethDetail();
    },
    onError: (error) => {
      console.error('Failed to delete medicines:', error);
    },
  });
  setIsDeletePopupOpen(false);
};
  const itemColumns: Column<OrderDetail>[] = [
    {
      key: 'medicine',
      label: 'Medicine',
      render: (_, row) =>
        typeof row.medicine === 'string'
          ? row.medicine
          : row.medicine.name,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      type: 'number',
    },
    {
      key: 'unitPrice',
      label: 'Unit Price',
      sortable: true,
      type: 'number',
      render: (_, row) => `$${row.unitPrice?.toFixed(2) ?? row.unitPrice?.toFixed(2)}`,
    },
    {
      key: 'totalPrice',
      label: 'Total',
      sortable: true,
      type: 'number',
      render: (_, row) => `$${row.totalPrice?.toFixed(2) ?? row.totalPrice?.toFixed(2)}`,
    },
      {
          key: "action",
          label: "Actions",
          sortable: false,
          type: "text",
          render: (_, row) => {
        
            return (
              <>
                <button
                  onClick={()=>{setIsDeletePopupOpen(true);setOrderDetailId(row._id)}}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  <IoIosRemoveCircle />
                </button>
  
              </>
            );
          },
        },
  ];



  if (orderdetailLoading) {
    return (
      <Loading
        isLoading={true}
        text="Fetching order details..."
        spinnerColor="border-indigo-600"
        textColor="text-indigo-600"
        overlayColor="bg-gray-100"
        overlayOpacity="bg-opacity-70"
        backgroundColor="bg-white"
      />
    );
  }

  if (!order) {
    return <div className="p-6">Order not found.</div>;
  }
 
  const handleSubmit = async () => {
    // Basic validation
    const errors: any = {};
    if (!medicine) errors.medicine = 'Medicine is required';
    if (quantity <= 0) errors.quantity = 'Quantity should be greater than 0';
    if (unitPrice <= 0) errors.unitPrice = 'Unit Price should be greater than 0';
    if (totalPrice <= 0) errors.totalPrice = 'Total Price should be greater than 0';

    setErrorObject(errors);
    if (Object.keys(errors).length > 0) return; // Stop if validation fails

    const orderDetail: CreateOrderItemDto = {
        orderKey,
      medicine,
      quantity,
      unitPrice,
      totalPrice,
    };

    // Call the onSubmit function passed from the parent component
    CreateOrderDetail(
        orderDetail,
        {
          onSuccess: () => {
            setMessage("Create new User Successfully");
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
  
            setIsOpenAddModel(false);
            refetch();
          },
        }
      );
    setMedicine('');
    setQuantity(1);
    setUnitPrice(0);
    setTotalPrice(0);
 
  };



  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUnitPrice(value);
    setTotalPrice(quantity * value);
  };
  // Handle medicine change
  const handleMedicineChange = (selectedValue: string) => {
    setMedicine(selectedValue); // Update the selected medicine

    // Find the selected medicine from the list
    const selectedMedicine = medicinesList?.find((med) => med._id === selectedValue);

    // If a medicine is found, set the max quantity and unit price
    if (selectedMedicine) {
      setMaxQuantiy(selectedMedicine.quantityInStock);
      setUnitPrice(selectedMedicine.price);
      setTotalPrice(quantity * selectedMedicine.price); // Recalculate total price when medicine is changed
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= maxQuantiy) {
      setQuantity(newQuantity); // Update the quantity if valid
      setTotalPrice(newQuantity * unitPrice); // Recalculate total price based on quantity and unit price
    }
  };
  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Order #{order.orderKey}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="border p-4 rounded shadow-sm space-y-1">
          <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
          <p><strong>Name:</strong> {order.customerName}</p>
          {order.customerPhone && <p><strong>Phone:</strong> {order.customerPhone}</p>}
          {order.customerAddress && <p><strong>Address:</strong> {order.customerAddress}</p>}
        </div>

        {/* Order Summary */}
        <div className="border p-4 rounded shadow-sm space-y-1">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          <p><strong>Created At:</strong> {dayjs(order.createAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
        <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Orders Management</h1>
           
              <button
                  onClick={() => {
                    setIsOpenAddModel((prev) => !prev);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                 <MdOutlineCollectionsBookmark />
                </button>
            </div>
      

      {/* Order Item Table */}
      <div className='w-1/2'>
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <Table
          columns={itemColumns}
          data={orderdetail??[]}
        //   columnWidths={{
        //     medicine: 200,
        //     quantity: 100,
        //     unitPrice: 150,
        //     totalPrice: 150,
        //     createdAt:200
        //   }}
        />
      </div>

      <Popup isOpen={isOpenAddModel}  maxNestedDepth={0}      onClose={() => setIsOpenAddModel(false)} title="Add Medicine" width="w-[400px]">
      <div className="grid grid-cols-1 gap-6">
        {/* Medicine Selection */}
        <div>
       
          <CustomSelect
              label="Medicines"
              value={medicine}
              onChange={handleMedicineChange}
              options={options}
              placeholder="Choose Medicine"
              //error={error}
            />
          {errorObject.medicine && <div className="text-red-400">{errorObject.medicine}</div>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={medicine==''}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            placeholder="Enter Quantity"
            max={maxQuantiy}
          />
          {errorObject.quantity && <div className="text-red-400">{errorObject.quantity}</div>}
        </div>

        {/* Unit Price */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={handleUnitPriceChange}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300"
            placeholder="Enter Unit Price"
          />
          {errorObject.unitPrice && <div className="text-red-400">{errorObject.unitPrice}</div>}
        </div>

        {/* Total Price (calculated from quantity and unit price) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Total Price</label>
          <input
            type="number"
            value={totalPrice}
            readOnly
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none border-gray-300 bg-gray-200"
            placeholder="Total Price"
          />
          {errorObject.totalPrice && <div className="text-red-400">{errorObject.totalPrice}</div>}
        </div>

        {/* Create Order Detail Button */}
        <div className="flex justify-end mt-1">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Order Detail
          </button>
        </div>
      </div>
    </Popup>
     <Popup
      isOpen={isDeletePopupOpen}
      onClose={() => setIsDeletePopupOpen(false)}
      title="Confirm Delete"
      width="w-[400px]"
      maxNestedDepth={0}
    >
      <div className="p-4">
        <p className="mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold"></span>? This action cannot be undone.
        </p>
    
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsDeletePopupOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
    
          <button
            onClick={() => {
             handleRemoveMedicine()
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Popup>
    {showToast && (
        <Toast
          message={message}
          type="success"
          duration={3000}
          position="top-right"
        />
      )}
    </div>
  );
};

export default OrderDetailPage;
