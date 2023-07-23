"use client";
import { useConnectors, useAccount } from "@starknet-react/core";
import "./App.css";
import { cancelIt, executeOi, mintMe, writeContract } from "./lib/connection";
import { useState } from "react";

// import { queryOwner } from "./lib/connection";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Transactions", href: "#" },
  { name: "Governance Votes", href: "#" },
  { name: "Wallet", href: "https://auto-stark.vercel.app/Wallet" },
];

const headerLogoSrc =
  "https://blogger.googleusercontent.com/img/a/AVvXsEh-KKsOSvE1Gv-mTWhr7rI3MWIIWRdog4C1HCmuC59IbgXPgrojILhtPF5g4QdoxCNMR3bDELWe130p9RvRNIuN9XWt_8_NEmkE6Uq7dPPYGuhLLyZBZ_RnfF7D5AZpiGpLSwgRGzvLEKk76uJjuX1loHa_pkQ3eRWvWp-BQF5-v96xxWgOW0MiedORvsI";

function App() {
  const { account, address, status } = useAccount();
  const { connect, connectors } = useConnectors();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [window, setWindow] = useState("");
  const [delay, setDelay] = useState("");
  const [id, setId] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    await writeContract(account, from, to, amount, window, delay);
  };
  const handleBlick = async (e) => {
    e.preventDefault();
    await executeOi(account, from, to, amount);
  };
  const handleFlick = async (e) => {
    e.preventDefault();
    await cancelIt(account, id);
  };
  const handleMint = async (e) => {
    e.preventDefault();
    await mintMe(account, from);
  };
  return (
    <div className="bg-[#1F1D29]   text-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex space-x-4 lg:flex-1">
            <a href="https://auto-stark.vercel.app/" className="flex space-x-1">
              <img className="h-14 w-auto" src={headerLogoSrc} alt="" />
              <p className="text-3xl text-blue-700 pt-2">Auto-stark</p>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex flex-col items-center justify-center space-y-4">
              {connectors.map((connector) => (
                <p key={connector.id}>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => connect(connector)}
                  >
                    {status === "connected" ? (
                      <>
                        <button
                          onClick={() =>
                            this.setState({ status: "disconnected" })
                          }
                        >
                          Disconnect Wallet
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => this.setState({ status: "connected" })}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </button>
                </p>
              ))}
            </div>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="flex space-x-4">
                <img className="h-12 w-auto" src={headerLogoSrc} alt="" />
                <p className="text-3xl text-blue-700 pt-2">auto-stark</p>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {connectors.map((connector) => (
                      <li key={connector.id}>
                        <button onClick={() => connect(connector)}>
                          Connect{connector.id}
                        </button>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="flex relative  bg-[#1F1D29] flex-col items-center justify-center h-screen space-y-20">
        <h1 className="text-4xl font-bold">Automation on Starknet</h1>
        <div className="flex bg-[#1F1D29] lg:pt-0 pt-40 lg:flex-row flex-col space-y-5 lg:space-x-20">
          {/* Form for handleMint */}
          <form
            className="flex flex-col  space-y-4 bg-[#1F1D29]"
            onSubmit={handleMint}
          >
            <p className="text-center text-xl text-white">Mint Function</p>
            <input
              type="text"
              value={from}
              className="text-center"
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Mint Me
            </button>
          </form>
          <form className="flex flex-col space-y-4" onSubmit={handleClick}>
            <p className="text-center text-xl text-white">Write Function</p>
            <input
              type="text"
              value={from}
              className="text-center"
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
            />
            <input
              type="text"
              value={to}
              className="text-center"
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
            />
            <input
              type="text"
              value={amount}
              className="text-center"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <input
              type="text"
              value={window}
              className="text-center"
              onChange={(e) => setWindow(e.target.value)}
              placeholder="Window"
            />
            <input
              type="text"
              value={delay}
              className="text-center"
              onChange={(e) => setDelay(e.target.value)}
              placeholder="Delay"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Write Contract
            </button>
          </form>

          <form className="flex flex-col space-y-4" onSubmit={handleBlick}>
            <p className="text-center text-xl text-white">Execute Function</p>
            <input
              type="text"
              value={from}
              className="text-center"
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
            />
            <input
              type="text"
              value={to}
              className="text-center"
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
            />
            <input
              type="text"
              value={amount}
              className="text-center"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Execute Oi
            </button>
          </form>

          {/* Form for handleFlick */}
          <form className="flex flex-col space-y-4" onSubmit={handleFlick}>
            <p className="text-center text-xl text-white">Cancel Function</p>
            <input
              type="text"
              value={amount}
              className="text-center"
              onChange={(e) => setId(e.target.value)}
              placeholder="Id"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Cancel It
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
