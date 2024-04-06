'use client'
import { PrimaryEditor } from '@/editor';
import { ContainerWrapper, DocumentUpload, FlexItemWrapper, FlexWrapper, FooterActionView, HeaderActionView, LabelView, Messages, NonFormWrapper, Spinner, TextInputView } from '@/helpers';
import { useResourceSingle, useResourceUpdate, useUploadDocument } from '@/hooks';
import { DocumentModal } from '@/modals';
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function EditOrder() {
    const { id } = useParams();

    const { data } = useResourceSingle('orders', id);
    
    const [formData, setFormData] = useState({
      ordertitle: '',
      orderspace: '',
      orderdeadline: '',
      orderlanguage: '',
      orderformat: '',
      orderpages: '',
      ordersources: '',
      orderstatus: '',
      orderpaymentstatus: '',
      orderprice: '',
      orderdefaultdocument: '',
      orderdocuments: '',
      initialContent: ''
    });
    
    const [orderDescription, setOrderDescription] = useState('');

    useEffect(() => {
      if (data?.data) {
        setFormData({
          ...formData,
          ordertitle: data.data.ordertitle || '',
          orderspace: data.data.orderspace?.title || '',
          orderdeadline: data.data.orderdeadline?.title || '',
          orderlanguage: data.data.orderlanguage?.title || '',
          orderformat: data.data.orderformat?.title || '',
          orderpages: data.data.orderpages || '',
          ordersources: data.data.ordersources || '',
          orderstatus: data.data.orderstatus?.title || '',
          orderpaymentstatus: data.data.orderpaymentstatus?.title || '',
          orderprice: data.data.orderprice || '',
          orderdefaultdocument: data.data.orderdefaultdocument || {},
          orderdocuments: data.data.orderdocuments || [],
          initialContent: data.data.orderdescription || ''
        });
        editorInstanceHandler();
      }
    }, [data]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const editorInstanceHandler = (content, editor) => {
      setOrderDescription(content);
    };

    const [limit, setLimit] = useState(10);
    const {
        fileInputRef,
        data: dataUploaded,
        documents,
        defaultDocument,
        setDefaultDocument,
        setDocuments,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
    } = useUploadDocument(limit, 'order-documents');
      
    useEffect(() => {
      setDefaultDocument(formData.orderdefaultdocument || {});
      setDocuments(formData.orderdocuments || []);
    }, [formData.orderdefaultdocument, formData.orderdocuments]);
      
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const { data: dataUpdated, updateResource } = useResourceUpdate(`orders`, id, formData, setFormData);
    const handleUpdate = async (e) => {
      e.preventDefault();
      const updateItem = {
          orderdescription: orderDescription,
          orderdefaultdocument: defaultDocument,
          orderdocuments: documents,
      };
      updateResource(updateItem, '/user/o/orders');
    };

  return (
    <ContainerWrapper>
      <HeaderActionView
          backLink="/user/o/orders"
          backText="Orders"
          itemText="Update Order"
      />
      {dataUpdated.loading && <Spinner/>}
      {dataUpdated.error && !dataUpdated.loading && <Messages>{dataUpdated.error}</Messages>}
      <NonFormWrapper>
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Order Title`} forWhat={`ordertitle`} />
              <TextInputView
                  id={`ordertitle`}
                  type={`text`}
                  name={`ordertitle`}
                  value={formData.ordertitle}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Title of the order`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Letter Spacing`} forWhat={`orderspace`} />
              <TextInputView
                  id={`orderspace`}
                  type={`text`}
                  name={`orderspace`}
                  value={formData.orderspace}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Letter Spacing`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Order Deadline`} forWhat={`orderdeadline`} />
              <TextInputView
                  id={`orderdeadline`}
                  type={`text`}
                  name={`orderdeadline`}
                  value={formData.orderdeadline}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Order deadline`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Order Language`} forWhat={`orderlanguage`} />
              <TextInputView
                  id={`orderlanguage`}
                  type={`text`}
                  name={`orderlanguage`}
                  value={formData.orderlanguage}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Order language`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Order format`} forWhat={`orderformat`} />
              <TextInputView
                  id={`orderformat`}
                  type={`text`}
                  name={`orderformat`}
                  value={formData.orderformat}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Order language`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/4`}>
              <LabelView name={`Number of Pages`} forWhat={`orderpages`} />
              <TextInputView
                  id={`orderpages`}
                  type={`number`}
                  name={`orderpages`}
                  value={formData.orderpages}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`0`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/4`}>
              <LabelView name={`Number of Sources`} forWhat={`ordersources`} />
              <TextInputView
                  id={`ordersources`}
                  type={`number`}
                  name={`ordersources`}
                  value={formData.ordersources}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`0`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/4`}>
              <LabelView name={`Order Stage`} forWhat={`orderstatus`} />
              <TextInputView
                  id={`orderstatus`}
                  type={`text`}
                  name={`orderstatus`}
                  value={formData.orderstatus}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`pending`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/4`}>
              <LabelView name={`Order payment status`} forWhat={`orderpaymentstatus`} />
              <TextInputView
                  id={`orderpaymentstatus`}
                  type={`text`}
                  name={`orderpaymentstatus`}
                  value={formData.orderpaymentstatus}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`Unpaid`}
                  disabled={true}
              />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <LabelView name={`Price`} forWhat={`orderprice`} />
              <TextInputView
                  id={`orderprice`}
                  type={`number`}
                  name={`orderprice`}
                  value={formData.orderprice}
                  change={handleChange}
                  autoComplete={false}
                  placeholder={`0`}
                  disabled={true}
              />
            </FlexItemWrapper>
        </FlexWrapper>

        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                <LabelView name={`Order Description`} forWhat={`orderdescription`} />
                <PrimaryEditor 
                  editorInstanceHandler={editorInstanceHandler}
                  editorConfig={{
                    menubar: false,
                    selector: "orderdescription",
                    height: 300,
                  }}
                  initialValue={formData.initialContent}
                />
            </FlexItemWrapper>
            <FlexItemWrapper width={`md:w-1/2`}>
              <DocumentUpload
                  handleFileInputChange={handleFileInputChange}
                  isUploadDisabled={isUploadDisabled}
                  dataUploaded={dataUploaded}
                  handleIconClick={handleIconClick}
                  fileInputRef={fileInputRef}
                  handleModalOpen={handleModalOpen}
                  defaultDocument={defaultDocument}
                  iconText={`Max Documents (${limit})`}
              />
          </FlexItemWrapper>
          <FlexItemWrapper width={`md:w-1/1`}>
            <DocumentModal
                showModal={showModal}  
                setShowModal={setShowModal}
                documents={documents}
                setDocuments={setDocuments}
                defaultDocument={defaultDocument}
                setDefaultDocument={setDefaultDocument}
            />
          </FlexItemWrapper>
        </FlexWrapper>

        <FooterActionView 
            handleSubmit={handleUpdate} 
            data={dataUpdated}
            createText="Update Order"
        />

      </NonFormWrapper>
    </ContainerWrapper>
  )
}