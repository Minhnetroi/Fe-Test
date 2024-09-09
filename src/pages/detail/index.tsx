import { useEffect, useState } from 'react'
import api from '../../config/axios';
import { Student } from '../../model/students';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;

function Detail() {
    const {id} = useParams();
    const [student, setStudnet] = useState<Student>();
  const fetchDetailStudent = async () => {
    try {
      const response = await api.get(`studentManagement/${id}`);
      console.log(response.data)
      setStudnet(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect (() => {
    fetchDetailStudent();
  })
  
  return (
    <div style={{
        display:"flex",
        justifyContent: "center",
        margin: "10px"
    }}>
        <Card
            style={{ width: 300 }}
            cover={
                <img alt="example" src={student?.image}/>}
        >
            <Meta
                title={
                    <p style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <span>{student?.name}</span>
                        <span>{student?.class}</span>
                    </p>
                }
            />
            <p>
                <strong>ID: </strong> {student?.id}
            </p>
            <p>
                <strong>DateOfBirth: </strong> {student?.dateofbirth}
            </p>
            <p>
                <strong>Gender: </strong> {student?.gender ? "Male" : "Female"}
            </p>
            <p>
                <strong>Class: </strong> {student?.class}
            </p>
            <p>
                <strong>Feedback: </strong> {student?.feedback}
            </p>
        </Card>
    </div>
  )
}

export default Detail