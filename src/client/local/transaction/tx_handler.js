import { hash } from '../../../crypto';
import { signTx } from './utils';


const hashTx = tx => hash.hashData(tx.toString());

