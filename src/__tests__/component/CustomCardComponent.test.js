import React from "react";
import { render } from "@testing-library/react-native";
import CustomCardComponent from "../../components/Card/CustomCardComponent";
import { useSelector } from "react-redux";

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => jest.fn()
  }));
  
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        favorites: { favoriCartItems: [] } 
      });
    });
  });
describe('CustomCardComponent',()=>{
    it('renders correctly',()=>{
        const testData={
            id:'1',
            name:'Test',
            price:'100',
            image:'test_image_url'
        };
        const {getByText}=render(<CustomCardComponent data={testData} />)
        expect(getByText('Test')).toBeTruthy();
        expect(getByText('100')).toBeTruthy();
    });
});