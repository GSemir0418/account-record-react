rm -rf dist
pnpm run build --base=/account-record-react-preview/
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:GSemir0418/account-record-react-preview.git
git push -f origin master:master
# 返回上一次的目录
cd -