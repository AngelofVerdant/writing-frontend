'use client'
import { CheckboxView, ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate } from '@/hooks';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditUser() {
    const { id } = useParams();

    const { data } = useResourceSingle('users', id);
    
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobilenumber: '',
        activestatus: '',
        lockstatus: '',
        adminstatus: '',
        writerstatus: '',
        customerstatus: '',
    });

    useEffect(() => {
        if (data?.data) {
            setFormData({
                ...formData,
                firstname: data.data.firstname || '',
                lastname: data.data.lastname || '',
                email: data.data.email || '',
                mobilenumber: data.data.mobilenumber || '',
                activestatus: data.data.isactive || false,
                lockstatus: data.data.islocked || false,
                adminstatus: data.data.isadmin || false,
                customerstatus: data.data.iscustomer || false,
                writerstatus: data.data.iswriter || false,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value)
        }));
    }; 

    const { data: dataUpdated, updateResource } = useResourceUpdate(`users`, id, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        isactive: formData.activestatus,
        islocked: formData.lockstatus,
        isadmin: formData.adminstatus,
        iscustomer: formData.customerstatus,
        iswriter: formData.writerstatus,
      };
      updateResource(updateItem, '/admin/u/users');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/u/users"
          backText="Users"
          itemText="Edit User"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`First Name`} forWhat={`firstname`} />
                <TextInputView
                    id={`firstname`}
                    type={`text`}
                    name={`firstname`}
                    value={formData.firstname}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`first name`}
                    disabled={true}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Last Name`} forWhat={`lastname`} />
                <TextInputView
                    id={`lastname`}
                    type={`text`}
                    name={`lastname`}
                    value={formData.lastname}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`last name`}
                    disabled={true}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Email`} forWhat={`email`} />
                <TextInputView
                    id={`email`}
                    type={`text`}
                    name={`email`}
                    value={formData.email}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`email`}
                    disabled={true}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Active Status`} forWhat={`activestatus`} />
                <CheckboxView
                    id="activestatus"
                    name="activestatus"
                    title={`Active`}
                    checked={formData.activestatus}
                    change={handleChange}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Lock Status`} forWhat={`lockstatus`} />
                <CheckboxView
                    id="lockstatus"
                    name="lockstatus"
                    title={`Lock`}
                    checked={formData.lockstatus}
                    change={handleChange}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Admin Status`} forWhat={`adminstatus`} />
                <CheckboxView
                    id="adminstatus"
                    name="adminstatus"
                    title={`Access`}
                    checked={formData.adminstatus}
                    change={handleChange}
                    disabled={true}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Customer Status`} forWhat={`customerstatus`} />
                <CheckboxView
                    id="customerstatus"
                    name="customerstatus"
                    title={`Active`}
                    checked={formData.customerstatus}
                    change={handleChange}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Writer Status`} forWhat={`writerstatus`} />
                <CheckboxView
                    id="writerstatus"
                    name="writerstatus"
                    title={`Access`}
                    checked={formData.writerstatus}
                    change={handleChange}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update User"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}