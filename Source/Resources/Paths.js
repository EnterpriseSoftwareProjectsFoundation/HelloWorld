
import { fromFileUrl , dirname , join } from 'Path'


const { url } = import.meta ;

const folder = dirname(fromFileUrl(url));


export const project
     = join(folder,'..','..')

export const data
     = join(project,'Data');

export const font
     = join(data,'Font');
