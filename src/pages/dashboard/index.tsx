import { useEffect, useState } from "react";
import { Student } from "../../model/students";
import api from "../../config/axios";
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Select, Table, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import uploadFile from "../../utils/upload";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

function Dashboard() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DateOfBirth",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (gender ? "Male" : "Female")
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="" style={{ width: "50px", height: "50px" }} />
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, all) => <>
        <Popconfirm
          title="Are you sure!!!"
          onConfirm={() => handleDelete(id)}
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
        <Button
          type="primary"
          onClick={() => {
            console.log(all)
            setIsOpen(true);
            setIsUpdate(true);

          }}>Update</Button>
      </>
    },
  ];
  const handleDelete = async (id) => {
    try {
      await api.delete(`studentManagement/${id}`);
      toast.success("Delete successfully!!!");
      fetchStudent();
    } catch (error) {
      console.log(error)
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = useForm();
  const [student, setStudnet] = useState<Student[]>();
  const fetchStudent = async () => {
    try {
      const response = await api.get("studentManagement");
      console.log(response.data)
      setStudnet(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchStudent();
  }, [])

  const props: UploadProps = {
    name: 'file',
    action: 'https://66becc1642533c403144129a.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onfinish = async (values) => {
    const dateFormatted = moment(values.dateofbirth.$d).format('YYYY-MM-DD');
    values.dateofbirth = dateFormatted;
    if (values?.id) {
      await api.put(`studentManagement/${values.id}`, values);
      toast.success("Update successfully!!!");
    } else {
      await api.post("studentManagement", values);
      toast.success("Add new student successfully!!!");
    }

    setIsOpen(false);
    form.resetFields();
    fetchStudent();
  }

  return (
    <div>
      <Button onClick={() => {setIsOpen(true); setIsUpdate(false); form.resetFields();}}>Add new student</Button>
      <Table dataSource={student} columns={columns}>
      </Table>
      <Modal onOk={() => form.submit()} title={isUpdate ? "Update student" : "Add new student"} open={isOpen} onCancel={() => setIsOpen(false)}>
        <Form form={form} onFinish={onfinish}>
          <Form.Item hidden label="ID" name={"id"}><Input /></Form.Item>
          <Form.Item label="Name" name={"name"}
            rules={[
              {
                required: true,
                message: "Please input name!!!"
              },
              {
                validator: (_, value) => {
                  if (!value || value.trim().split(" ").length > 2) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Name must more than 2 words!!!"));
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="DateOfBirth" name={"dateofbirth"}
            rules={[
              {
                required: true,
                message: "Please choose birthday!!!"
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Gender" name={"gender"}
            rules={[
              {
                required: true,
                message: "Please choose gender!!!"
              }
            ]}
          >
            <Select
              options={[
                {
                  value: true,
                  label: "Male",
                },
                {
                  value: false,
                  label: "Female",
                },
              ]}
            >

            </Select>
          </Form.Item>
          <Form.Item label="Class" name={"class"}
            rules={[
              {
                required: true,
                message: "Please input class!!!"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image" name={"image"}
            rules={[
              {
                required: true,
                message: "Please choose name!!!"
              }
            ]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Feedback" name={"feedback"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Dashboard