class Config:
    DEBUG = False


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True
