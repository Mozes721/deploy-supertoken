import { useState, useEffect } from 'react';
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { getNetworkContract } from '../utils/getNetworkContract';
import supertoken_factory from '../constants/ABIs/supertoken_factory.json';
import { useContractWrite, usePrepareContractWrite, useNetwork } from 'wagmi'
import DeploySupertoken from '../components/forms/DeploySupertoken';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { chain, chains } = useNetwork()

  const [contract, setContract] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  
  useEffect(() => {
    const contractAddress = getNetworkContract(chain?.id!);
    setChainId(chain?.id!);
    setContract(contractAddress);
  }, [chain])

  const { config } = usePrepareContractWrite({
    address: contract,
    abi: supertoken_factory,
    functionName: 'createERC20Wrapper',
    args: ['0xE3322702BEdaaEd36CdDAb233360B939775ae5f1', 1, 'Super Tellor Tribute', 'TRBx'],
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const deploySupertoken = () => {
    console.log('write', contract, chain)
    write?.();
  }
  
  console.log('chain', chain, 'chains', chain, 'contract', contract);

  return (
    <>
      <Head>
        <title>Deploy Supertoken</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          chainId ?
          ''
          :
          <div className={styles.description}>
            <p>
              Connect Your Wallet to get started.&nbsp;
            </p>
          </div>
        }
        
        <div className={styles.center}>
          Deploy Your Supertoken

          <DeploySupertoken />

          <button onClick={deploySupertoken}>
            Deploy Supertoken
          </button>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Deploying Supertokens
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn more about Supertokens
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Support <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Contact the community for support
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Supertoken.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
