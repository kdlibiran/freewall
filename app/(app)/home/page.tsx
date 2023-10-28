import Image from "next/image";
export default function dashboard() {
  return (
    <div>
      <Image
        src="assets/icons/log-in.svg"
        alt="Login"
        height={18}
        width={18}
        style={{ filter: "invert(100%)" }}
      />
      <Image
        src="assets/icons/log-out.svg"
        alt="Login"
        height={18}
        width={18}
        style={{ filter: "invert(100%)" }}
      />
    </div>
  );
}
