'use client';
import addData from '@/firebase/addData';
import deleteData from '@/firebase/deleteData';
import { getAllData } from '@/firebase/getAllData';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { result, error } = await getAllData('data');
      if (error) {
        console.log(error);
      } else {
        setData(result);
      }
    }
    fetchData();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formController = async () => {
    const { result, error } = await addData('data', { key, value });
    if (error) {
      alert('Something went wrong');
    } else {
      setData([...data, { key, value }]);
      setKey('');
      setValue('');
      closeModal();
    }
  };

  const deleteDocument = async (id) => {
    const { result, error } = await deleteData('data', id);
    if (error) {
      alert('Something went wrong');
    } else {
      setData(
        data.filter((item) => {
          return item.id !== id;
        })
      );
      setKey('');
      setValue('');
      closeModal();
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-[100px] mb-10">
        Welcome to the API Server
      </h1>

      <div className="w-[90vw] mx-auto">
        <button
          className="bg-slate-400 p-3 mb-5 rounded-lg hover:bg-slate-600 text-white cursor-pointer"
          onClick={openModal}
        >
          Add Data
        </button>
      </div>

      <div className="table  w-[90vw]  mx-auto  border border-spacing-6 border-slate-500 border-separate">
        <div className="table-header-group ">
          <div className="table-row ">
            <div className="table-cell text-left  font-mono font-extrabold ">
              Key
            </div>
            <div className="table-cell text-left font-mono font-extrabold ">
              Value
            </div>
            <div className="table-cell text-left font-mono font-extrabold ">
              Action
            </div>
          </div>
        </div>
        <div className="table-row-group">
          {data.map((item, index) => (
            <div className="table-row " key={item.id + index}>
              <div className="table-cell   min-w-[80px] ">{item.key}</div>
              <div className="table-cell min-w-[80px] ">{item.value}</div>
              <div className="table-cell ...">
                <div>
                  <button
                    className="bg-slate-400 p-3 mb-5 rounded-lg hover:bg-slate-600 text-white cursor-pointer"
                    onClick={() => deleteDocument(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Your Data
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Key
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="key"
                            id="key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="key"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Value
                        </label>

                        <div className="mt-1">
                          <input
                            type="text"
                            name="value"
                            id="value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4 bg-slate-100"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="float-right rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={formController}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}