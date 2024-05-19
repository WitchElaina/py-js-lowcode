import logging

# Logger configuration
logging.basicConfig(
    level=logging.DEBUG, format="[%(asctime)s][%(levelname)s](%(name)s): %(message)s"
)


# create logger
def create_logger(name):
    return logging.getLogger(name)
