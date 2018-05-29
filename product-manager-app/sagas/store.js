import { takeLatest, put } from "redux-saga/effects";
import * as storeActionCreators from "../actionCreators/store";
import {
    GET_STORES,
} from "../actionTypes/store";


function* getStoreMap(action) {
    try {
        let stores = [
            {
                latitude: 13.019995,
                longitude: 80.185405,
                title: "Bay Store",
                id: "s1"
            },
            {
                latitude: 13.040172,
                longitude: 80.184968,
                title: "Pep Store",
                id: "s2"
            },
            {
                latitude: 12.990172,
                longitude: 80.183968,
                title: "Dry Store",
                id: "s3"
            }
        ];
        yield put(storeActionCreators.getStoresSuccess(stores))
    } catch (error) {
        yield put(storeActionCreators.getStoresFailure(error))
    }
}

export function* storeWatchers() {
    yield takeLatest(GET_STORES, getStoreMap);
}