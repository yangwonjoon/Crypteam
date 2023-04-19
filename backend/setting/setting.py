import logging
def logging_set():
    logger = logging.getLogger("test")
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    # log 출력
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    # log를 파일에 출력
    file_handler = logging.FileHandler('GetCoin.log')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger
