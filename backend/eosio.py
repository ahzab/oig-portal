import requests
import json
import time
import re
import random
import db_connect
import core



headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'curl/7.77.0'
    }

s = requests.Session()
s.headers.update(headers)


# API calls Class
class Api_Calls:
    def __init__(self, version, call):
        # V2 or V1 history or Atomic assets
        if version == 'v2-history':
            self.url = '/v2/history/'
        elif version == 'v1':
            self.url = '/v1/chain/'
        elif version == 'v1-history':
            self.url = '/v1/history/'
        elif version == 'v2':
            self.url = '/v2/'
        elif version == 'atomic':
            self.url = '/atomicassets/v1/'
        elif version == 'producer':
            self.url = '/v1/producer/'
        elif version == 'db_size':
            self.url = '/v1/db_size/get'
        elif version == 'net':
            self.url = '/v1/net/'
        elif version == '/v2/history/get_transaction':
            self.url = '/v2/history/get_transaction?'
        else:
            self.url ='/'

            
        self.version = version
        self.call = call
        
    # Class function - Return the URL by default
    def __str__(self):
        return f'{self.url}{self.call}'
## Example
#get_info = str(Api_Calls('v1', 'get_info') -  returns /v1/chain/get_info


# Hyperion Endpoints
HyperionNodeMainnet = 'http://172.16.0.80:7000'
HyperionNodeMainnet2 ='http://wax.blokcrafters.io' 
HyperionNodeTesnet = 'https://wax-testnet.dapplica.io' #'https://testnet.waxsweden.org'
bad_node_list = [ 'http://wax.eu.eosamsterdam.net','https://api.wax.greeneosio.com' ]

def chainType(chain,api_url):
    if chain == 'testnet':
        URL = HyperionNodeTesnet + api_url
    else:
        URL = HyperionNodeMainnet + api_url
    return URL

class getJSON():
    def __init__(self,testType,chain,api_url):
        self.testType = testType
        self.chain = chain
        self.api_url = api_url

    # Get random node for testnet or mainnet
    def getRandomNode(self,err):
            if self.chain == 'testnet':
                self.url = getrandomNode(TestNodes) + self.api_url 
            elif self.chain == 'mainnet':
                self.url = getrandomNode(MainNodes) + self.api_url 
            # if testing single guild we don't want to try a random node
            else: 
                self.url = self.url
            print(f'Error: {err}. Node could not {self.testType}, trying a new node {self.url}')
            return self.url

    def reqPost(self,url,payload,retValue):
        self.retValue = retValue
        self.payload = payload
        # Set post Request as variable
        self.postRequest = requests.post(url,json=payload)
        try:
            self.response = self.postRequest
            self.response_json = json.loads(self.response.text)
            self.json = self.response_json[self.retValue]
        except Exception as err:
            url = self.getRandomNode(err)
            self.response = self.postRequest
            if len(self.retValue) == 1:
                self.json = self.response_json[self.retValue]
            elif len(self.retValue) == 2:
                self.json = self.response_json[self.retValue[0]][self.retValue[1]]
        return self.json
    
    def reqPostSimple(self,url,payload=None):
        # Set get Request as variable
        self.postRequest = requests.post(url,json=payload,timeout=60)
        try:
            self.response = self.postRequest
            self.response_json = json.loads(self.response.text)
        except Exception as err:
            url = self.getRandomNode(err)
            self.response = self.postRequest
        return self.response_json
    
    def reqGet(self,url,retValue,payload=None):
        self.getRequest = requests.get(url,params=payload,timeout=60)
        self.retValue = retValue
        try:
            self.response = self.getRequest
            self.response_json = json.loads(self.response.text)
            self.json = self.response_json[self.retValue]
        except Exception as err:
            url = self.getRandomNode(err)
            self.response = self.getRequest
            self.json = self.response_json[self.retValue]
        return self.json
    
    def reqGetSimple(self,url,payload=None):
        self.getRequest = requests.get(url,params=payload,timeout=60)
        try:
            self.response = self.getRequest
            self.response_json = json.loads(self.response.text)
        except Exception as err:
            url = self.getRandomNode(err)
            self.response = self.getRequest
        return self.response_json
    
 

# Obtain a reliable list of working hyperion nodes for V1 and V2 checks
def getFullnodes(testnet=False):
    if testnet:
        net = True
        chain = 'TestNet'
    else:
        net = False
        chain = 'MainNet'
    print(core.bcolors.OKYELLOW,f"{'='*100}\nObtaining a reliable list of working Hyperion {chain} nodes ",core.bcolors.ENDC)
    nodes = db_connect.getFullnodes(net)
    if not nodes:
        # If no nodes in DB, return single node
        nodelist = [{'Node': HyperionNodeMainnet}]
    #Else get all healthy hyperion nodes
    else:
        api_url = str(Api_Calls('v2', 'health'))
        nodelist = []
        for node in nodes:
            node = node[0]
            try:
                URL = node + api_url
                response = requests.get(URL, timeout=5)
                response.raise_for_status()
            except Exception as err:
                    continue
            # check whether 200 is returned
            if response.status_code == requests.codes.ok:
                responsetimes = response.elapsed.total_seconds()*1000
                try:
                    jsonres = response.json()
                    rpcstatus = jsonres.get('health')[1].get('status')
                except:
                    continue
                # Filter out nodes that do not respond, ms is higher than 500 and in bad node list
                if rpcstatus == 'OK' and responsetimes < 500 and node not in bad_node_list:
                    nodes = {'Node': node, 'res': responsetimes }
                    nodelist.append(nodes)
    return nodelist

#hyperion_Node = getrandomNode(nodelist)
MainNodes = getFullnodes()
TestNodes = getFullnodes(testnet=True)

# Get random node from list
def getrandomNode(nodelist):
    print(core.bcolors.OKYELLOW,f"{'='*100}\nChoosing random Hyperion node ",core.bcolors.ENDC)
    random_node = random.choice(nodelist)
    print(core.bcolors.OKYELLOW,"Random chosen node: ",random_node,core.bcolors.ENDC)
    return random_node.get('Node')


def hyperionindexedBlocks(host):
    try:
        url = host + str(Api_Calls('v2', 'health'))
        response = s.get(url, verify=False)
        jsonres = response.json()
    except:
        return False, 'Could not connect to Hyperion'
    health_info = jsonres.get('health')
    try:
        service_data = health_info[2]['service_data']
    except:
        return False, 'Hyperion last indexed does not match total indexed with range of 10'
    try:
        last_indexed = int(service_data['last_indexed_block'])
        total_indexed = int(service_data['total_indexed_blocks'])
    except:
        return False, 'Hyperion last indexed does not match total indexed with range of 10'
    try:
        first_indexed_block = int(service_data['first_indexed_block'])
        print(f' First indexed: {first_indexed_block}')
        missing_blocks = int(service_data['missing_blocks'])
        print(f' Missing blocks: {missing_blocks}')
        #if last_indexed-first_indexed_block in range(last_indexed-10, total_indexed+1):
        if missing_blocks > 5:
            return False, f'Hyperion last indexed does not match total indexed, missing blocks {missing_blocks}'
        else:
            return True, f'Hyperion Total blocks matches last indexed, missing blocks {missing_blocks}' 
    except:
        # We pass since not all hyperions will have this.
       pass
    
    #Check if total index is between total_index-10 and last_index+1, as they wont always exactly match.
    if last_indexed in range(last_indexed-10, total_indexed+1):
        return True, 'Hyperion Total blocks matches last indexed'
    else:
        return False, 'Hyperion last indexed does not match total indexed with range of 10'


def headblock(chain):
    testType = 'get Headblock'
    api_url = str(Api_Calls('v1', 'get_info'))
    URL = chainType(chain,api_url) 
    reqJSON = getJSON(testType,chain,api_url)
    return reqJSON.reqGet(URL,'head_block_num')

# Only used for testnet
def getblockTestnet(block):
    testType = 'get block from testnet'
    # Build URL from Api_call class
    api_url = str(Api_Calls('v1', 'get_block'))
    URL = HyperionNodeTesnet + api_url
    reqJSON = getJSON(testType,'testnet',api_url)
    return reqJSON.reqPostSimple(URL,{"block_num_or_id": block})


def getEOStable(table_info,chain='mainnet'):
    testType = 'Get table'
    api_url = str(Api_Calls('v1', 'get_table_rows'))
    URL = chainType(chain,api_url) 
    reqJSON = getJSON(testType,chain,api_url)
    return reqJSON.reqPost(URL,table_info,'rows')

# Returns list of producers in top21
def producerSCHED(chain='mainnet'):
    testType = 'get Producer Schedule'
    # Build URL from Api_call class
    api_url = str(Api_Calls('v1', 'get_block_header_state'))
    URL = chainType(chain,api_url) 
    reqJSON = getJSON(testType,chain,api_url)
    producers =  reqJSON.reqPost(URL,{"block_num_or_id": headblock("mainnet") } ,('active_schedule','producers'))
    top21_producer_list = []
    for i in producers:
        top21_producer_list.append(i['producer_name'])
    return top21_producer_list

print(producerSCHED(chain='mainnet'))

# Get all transaction numbers from a block
def randomTransaction(backtrack,chain):
    testType = 'get Random transaction'
    api_url = str(Api_Calls('v1', 'get_block'))
    curheadblock = headblock(chain)
    URL = chainType(chain,api_url) 
    testblock = curheadblock-backtrack
    reqJSON = getJSON(testType,chain,api_url)
    transactions =  reqJSON.reqPost(URL,{"block_num_or_id": testblock} ,'transactions')
    # Extract all transaction IDs
    trxlist = []
    for trx in transactions:
        try:
            trx = trx['trx']['id']
        except:
            # If not trx ix found set to False
            trx = False
        # Only add transaction to list if not false
        if trx != False:
            trxlist.append(trx)
    return trxlist


def get_http_version(url,version):
    if version == "v1":
        info = str(Api_Calls('v1', 'get_info')) 
    else:
        info = str(Api_Calls('v2', 'health'))
    url = url + info
    response = requests.get(url+info, timeout=60, verify=False)
    return response.raw.version

# Get actions OR transaction data from hyperion
def get_stuff(apiNode,payload,type):
    testType = f'get {type} from Hyperion'
    chain = 'guild'
    # get transaction from Hyperion node
    if type == 'trx':
        api_url = str(Api_Calls('v2-history', 'get_transaction'))
    # get action from Hyperion node
    else:
        api_url = str(Api_Calls('v2-history', 'get_actions'))
    URL = apiNode + api_url
    reqJSON = getJSON(testType,chain,api_url)
    return reqJSON.reqGetSimple(URL,payload)

# Performs a get info and looks for producer name, if found returns head_block num.
def get_testnetproducer_cpustats(producer):
    # Get current headblock from testnet
    current_headblock = headblock("testnet")
    # Set producer to random name
    blockproducer = "nobody"
    transactions = []
    amount = 0 
    while producer != blockproducer or len(transactions) == 0:
        currentblock = getblockTestnet(current_headblock)
        transactions = currentblock['transactions']
        # Set producer of current block
        blockproducer = currentblock['producer']
        # Deduct 1 from current block to check next block
        current_headblock = current_headblock - 1
        # Only go back 4000 Blocks
        amount = amount + 1
        if amount == 500:
            return None
    else:
        return currentblock['transactions'][0]['cpu_usage_us']







