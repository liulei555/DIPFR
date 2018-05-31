import {Row, Col, Input, Button, Icon} from 'antd';

const Option = ({styles, dispatch}) => {
  const singlePlayback = () => {

  };
  const multiPlayback = () => {

  };
  const comparePlayback = () => {

  };
  const segmentPlayback = () => {

  };
  return (<Row className={styles.option}>
    <Col>
      <Row className={styles.rowPadding}>
        <Col offset={1} span={6}>
          <Input/>
        </Col>
        <Col offset={1} span={6}>
          <Button><Icon type="save"/>私有场景</Button>
        </Col>
        <Col span={6}>
          <Button><Icon type="save"/>公有场景</Button>
        </Col>
      </Row>
    </Col>
    <Col>
      <Row className={styles.rowPadding}>
        <Button type='primary' size='small' onClick={singlePlayback}>单点回放</Button>
        <Button type='primary' size='small' onClick={multiPlayback}>多点回放</Button>
        <Button type='primary' size='small' onClick={comparePlayback}>比对回放</Button>
        <Button type='primary' size='small' onClick={segmentPlayback}>分段回放</Button>
        <Button type='primary' size='small' onClick={() => {
          dispatch({type: 'videoHistory/save', payload: {visible: true}})
        }}>视频取证</Button>
      </Row>
    </Col>
  </Row>);
};

export default Option;
