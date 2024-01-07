import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Space, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const DeleteModal = ({handleDelete}) => {

    const showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure to delete this record?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDelete();
          }
        });
      };
    return(
        <div>
            <Space wrap>
                <DeleteOutlined onClick={showDeleteConfirm}/>
              </Space>
        </div>
    )
}