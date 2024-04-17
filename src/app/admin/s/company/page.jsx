'use client'
import { ContainerWrapper, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, MediaUpload, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useFetchResourceOne, useResourceUpdateOne, useUploadMedia } from '@/hooks';
import { MediaModal } from '@/modals';
import React, { useState, useEffect } from 'react'

export default function Company() {
    const { data } = useFetchResourceOne('companies');
    
    const [formData, setFormData] = useState({
        companyname: '',
        companyemail: '',
        companyphone: '',
        companytwitterlink: '',
        companyfacebooklink: '',
        defaultimage: '',
        images: '',
    });

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          companyname: data.data.companyname || '',
          companyemail: data.data.companyemail || '',
          companyphone: data.data.companyphone || '',
          companytwitterlink: data.data.companytwitterlink || '',
          companyfacebooklink: data.data.companyfacebooklink || '',
          defaultimage: data.data.defaultimage || {},
          images: data.data.images || [],
        });
      }
    }, [data]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const [limit, setLimit] = useState(2);
    const {
        fileInputRef,
        data: dataUploaded,
        defaultImage,
        images,
        setDefaultImage,
        setImages,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
      } = useUploadMedia(limit, 'company');
      
    useEffect(() => {
      setDefaultImage(formData.defaultimage || {});
      setImages(formData.images || []);
    }, [formData.defaultimage, formData.images]);
      
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const { data: dataUpdated, updateResource } = useResourceUpdateOne(`companies`, formData, setFormData);

    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
        companyname: formData.companyname,
        companyemail: formData.companyemail,
        companyphone: formData.companyphone,
        companytwitterlink: formData.companytwitterlink,
        companyfacebooklink: formData.companyfacebooklink,
        defaultimage: defaultImage,
        images: images,
      };
      updateResource(updateItem, '/admin/h/overview');
    };
  

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/admin/h/overview"
          backText="Overview"
          itemText="Company"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Company Name`} forWhat={`companyname`} />
                <TextInputView
                    id={`companyname`}
                    type={`text`}
                    name={`companyname`}
                    value={formData.companyname}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`Name of the company`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Company Email`} forWhat={`companyemail`} />
                <TextInputView
                    id={`companyemail`}
                    type={`text`}
                    name={`companyemail`}
                    value={formData.companyemail}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`company@gmail.com`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Company Phone`} forWhat={`companyphone`} />
                <TextInputView
                    id={`companyphone`}
                    type={`text`}
                    name={`companyphone`}
                    value={formData.companyphone}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`+110056565656`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Company Twitter Link`} forWhat={`companytwitterlink`} />
                <TextInputView
                    id={`companytwitterlink`}
                    type={`text`}
                    name={`companytwitterlink`}
                    value={formData.companytwitterlink}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`https://twitter.com/companyhandle`}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
                <LabelView name={`Company Facebook Link`} forWhat={`companyfacebooklink`} />
                <TextInputView
                    id={`companyfacebooklink`}
                    type={`text`}
                    name={`companyfacebooklink`}
                    value={formData.companyfacebooklink}
                    change={handleChange}
                    autoComplete={false}
                    placeholder={`https://facebook.com/companyhandle`}
                />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/2`}>
            <MediaUpload
                handleFileInputChange={handleFileInputChange}
                isUploadDisabled={isUploadDisabled}
                dataUploaded={dataUploaded}
                handleIconClick={handleIconClick}
                handleModalOpen={handleModalOpen}
                fileInputRef={fileInputRef}
                defaultImage={defaultImage}
                iconText={`Max Images (${limit})`}
            />
          </FlexItemWrapper>
          <FlexItemWrapper width={`md:w-1/1`}>
              <MediaModal id="media" setDefaultImage={setDefaultImage} setImages={setImages} showModal={showModal} setShowModal={setShowModal} images={images} defaultImage={defaultImage} />
          </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Save"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}