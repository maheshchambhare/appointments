"use client";
import ModalLayout from "@/app/components/ModalLayout";
import BusineessUserEdit from "@/app/components/forms/BusineessUserEdit";
import Loader from "@/app/components/ui/Loader";
import { apicall } from "@/utils/getdata";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

function BusinessUsers() {
  const [businessUsers, setbusinessusers] = useState<any>([]);
  const [businessUserModal, setBusinessUserModal] = useState(false);
  const [selectedBusUser, setSelectedBusUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    apicall({
      path: "businessmembers",
      getResponse: (res) => {
        setbusinessusers(res.data.users);
      },
      getError: (err) => {
        router.push("/");
      },
      router,
      method: "get",
    });
  }, []);

  if (businessUsers.length == 0) {
    return <Loader />;
  }

  return (
    <>
      <p className="font-sans text-sm mt-6">All business users</p>

      <div className="flex  w-full mt-4 flex-wrap">
        {businessUsers.map((d: any, i: any) => {
          return (
            <div
              onClick={() => {
                setSelectedBusUser(d);
                setBusinessUserModal(true);
              }}
              className="border-[1px]  my-2 max-h-max px-2 py-1 rounded-md border-white mx-4 cursor-pointer"
              key={d.id}
            >
              <p>{d.name}</p>
              <p className="font-sans text-sm mt-2">
                {d.approved ? "Approved" : "not approved"}
              </p>
            </div>
          );
        })}

        {businessUserModal && (
          <ModalLayout
            isOpen={businessUserModal}
            modalTitle={"Business User Info"}
            modalWidth="30%"
            setIsOpen={(e) => {
              setBusinessUserModal(e);
            }}
          >
            <BusineessUserEdit
              id={selectedBusUser.id}
              approved={selectedBusUser.approve}
              members={selectedBusUser.membersLength}
              setOpen={(e) => {
                setBusinessUserModal(e);
              }}
            />
          </ModalLayout>
        )}
      </div>
    </>
  );
}

export default BusinessUsers;
