import { useSession } from "next-auth/react";
import TradeItem from "./[identifier]";

export default function TradePage() {
  const { data: session } = useSession();
  return (
    <>
      <TradeItem />
    </>
  );
}
