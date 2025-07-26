import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import Image from "next/image";
import IconWallet from "@/assets/icons/IconWallet";

const ConnectButtonCustom: FC<{
  isAlwaysShow?: boolean;
  extendClassName?: string;
}> = ({ isAlwaysShow, extendClassName }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="block w-full h-full cursor-pointer"
                  >
                    {!isAlwaysShow && (
                      <div>
                        <div
                          className={`hidden md:block bg-[#09090B] transition-colors duration-200 hover:bg-[#5569ff] px-4 py-2 rounded-full text-white ${extendClassName}`}
                        >
                          Connect Wallet
                        </div>
                        <div className="block md:hidden">
                          <IconWallet />
                        </div>
                      </div>
                    )}
                    {isAlwaysShow && (
                      <div className="block bg-[#09090B] transition-colors duration-200 hover:bg-[#5569ff] px-4 py-2 rounded-full text-white">
                        Connect Wallet
                      </div>
                    )}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  <div className="hidden md:flex gap-3">
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      className="px-4 py-2 rounded-full bg-[#09090B] transition-colors duration-200 hover:bg-[#5569ff] text-white"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="px-4 py-2 rounded-full bg-[#5569ff] transition-colors duration-200 hover:bg-[#09090B] text-white"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                  <div className="block md:hidden">
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="w-[53px] h-[37px] flex items-center justify-center rounded-lg border border-white transition-colors duration-200 hover:bg-[#09090B] text-white"
                    >
                      <IconWallet />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectButtonCustom;
