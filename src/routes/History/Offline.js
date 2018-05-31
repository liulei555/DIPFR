import {Row, Col, Input, Upload, Button} from 'antd';

const Offline = ({styles}) => {

  const submit=()=>{

  }
  return (<div className={styles.offline}>
    <Row>
      <Col offset={2} span={10}>
        <Input />
      </Col>
      <Col offset={1} span={10}>
        <Upload><Button style={{width:140}} >浏览添加</Button></Upload>
      </Col>
    </Row>
    <Row type="flex" justify="center">
        <Button type="primary" onClick="submit">
          回放
        </Button>
    </Row>
  </div>)
}

export default Offline;
