"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../shared/Avatar";
import { useCallback, useState } from "react";
import UserMenuItem from "./UserMenuItem";
import useRegistrationModal from "@/hooks/useRegistrationModal";
import useLoginModal from "@/hooks/useLoginModal";
import { HeaderProps } from "@/lib/appTypes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRentModal from "@/hooks/useRentModal";

const UserMenu = ({ user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { onOpen } = useRegistrationModal();
  const { onOpen: loginOnOpen } = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggleMenu = useCallback(() => setIsMenuOpen((value) => !value), []);

  const onRent = useCallback(() => {
    if (!user) {
      return loginOnOpen();
    }
    return rentModal.onOpen();
  }, [user, loginOnOpen, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row item-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          WaterBnb your home
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar url={user?.image} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute overflow-hidden rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {user ? (
                <>
                  <UserMenuItem
                    onClick={() => {}}
                    label={user.name || "User"}
                  />
                  <UserMenuItem
                    onClick={() => {
                      router.push("/trips");
                      toggleMenu();
                    }}
                    label="My trips"
                  />
                  <UserMenuItem
                    onClick={() => {
                      router.push("/favorites");
                      toggleMenu();
                    }}
                    label="My favorites"
                  />
                  <UserMenuItem
                    onClick={() => {
                      router.push("/reservations");
                      toggleMenu();
                    }}
                    label="My reservations"
                  />
                  <UserMenuItem
                    onClick={() => {
                      router.push("/properties");
                      toggleMenu();
                    }}
                    label="My properties"
                  />
                  <UserMenuItem
                    onClick={() => {
                      rentModal.onOpen();
                      toggleMenu();
                    }}
                    label="WaterBnb my home"
                  />
                  <hr />
                  <UserMenuItem
                    onClick={() => signOut().then(() => router.refresh())}
                    label="Logout"
                  />
                </>
              ) : (
                <>
                  <UserMenuItem onClick={loginOnOpen} label="Login" />
                  <UserMenuItem onClick={onOpen} label="Signup" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
