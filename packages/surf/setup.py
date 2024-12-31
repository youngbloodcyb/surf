from setuptools import setup, find_namespace_packages

setup(
    name="surf",
    version="0.1.0",
    packages=find_namespace_packages(include=["surf", "surf.*"]),
    package_dir={"": "api"},
    install_requires=[
        "pytz",
        "requests",
    ],
) 