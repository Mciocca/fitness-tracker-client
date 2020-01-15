import { GlobalWithFetchMock } from "jest-fetch-mock";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react"

configure({ adapter: new Adapter() });

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

//this fixes an issue with material ui in jest tests
React.useLayoutEffect = React.useEffect
