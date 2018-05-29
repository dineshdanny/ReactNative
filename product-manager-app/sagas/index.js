import { productWatchers } from "./product";
import { storeWatchers } from './store';

export default function* rootWatchers() {
    yield [productWatchers(), storeWatchers()]
}