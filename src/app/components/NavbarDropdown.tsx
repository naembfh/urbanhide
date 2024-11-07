import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/middleware";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {user?.role === "ADMIN" ? (
          <DropdownItem onClick={() => handleNavigation("/admin")}>
            Admin Panel
          </DropdownItem>
        ) : (
          <DropdownItem onClick={() => handleNavigation("profile/my-order")}>
            My Order
          </DropdownItem>
        )}
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
